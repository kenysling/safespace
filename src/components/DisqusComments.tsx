import React, { useEffect, useState } from 'react';
import { MessageSquare, AlertCircle } from 'lucide-react';

interface DisqusCommentsProps {
  pageUrl?: string;
  pageIdentifier?: string;
  title?: string;
}

declare global {
  interface Window {
    disqus_config?: () => void;
    DISQUS?: {
      reset: (options: { reload: boolean; config?: () => void }) => void;
    };
  }
}

export const DisqusComments: React.FC<DisqusCommentsProps> = ({
  pageUrl,
  pageIdentifier,
  title = 'Community & Homeowner Discussions',
}) => {
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const canonicalUrl = pageUrl || window.location.href;
    const identifier = pageIdentifier || window.location.pathname;

    window.disqus_config = function () {
      // @ts-ignore
      this.page.url = canonicalUrl;
      // @ts-ignore
      this.page.identifier = identifier;
    };

    const disqusEmbedUrl = 'https://https-safespace-lemon-vercel-app.disqus.com/embed.js';

    if (window.DISQUS) {
      try {
        window.DISQUS.reset({
          reload: true,
          config: function () {
            // @ts-ignore
            this.page.url = canonicalUrl;
            // @ts-ignore
            this.page.identifier = identifier;
          },
        });
      } catch (err) {
        console.warn('Disqus reset error:', err);
      }
    } else {
      // Inject Disqus script safely
      const script = document.createElement('script');
      script.id = 'disqus-embed-script';
      script.src = disqusEmbedUrl;
      script.setAttribute('data-timestamp', (+new Date()).toString());
      script.async = true;
      script.onerror = () => {
        console.warn('Disqus script failed to load or was blocked by browser/adblocker.');
        setLoadError(true);
      };
      (document.head || document.body).appendChild(script);
    }

    // Load count script safely if not present
    if (!document.getElementById('dsq-count-scr')) {
      const countScript = document.createElement('script');
      countScript.id = 'dsq-count-scr';
      countScript.src = '//https-safespace-lemon-vercel-app.disqus.com/count.js';
      countScript.async = true;
      countScript.onerror = () => {
        console.warn('Disqus count script failed to load.');
      };
      (document.head || document.body).appendChild(countScript);
    }
  }, [pageUrl, pageIdentifier]);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xl space-y-4 text-slate-900">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <MessageSquare className="w-5 h-5 text-teal-600" />
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-bold ml-auto">
          Powered by Disqus
        </span>
      </div>

      <p className="text-xs text-slate-500">
        Share feedback, ask questions, and read community discussions regarding Singapore interior design firms, HDB renovation experiences, and quotation audits.
      </p>

      {/* Disqus Thread Container or Fallback */}
      {loadError ? (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <span className="font-bold block">Community Comments Widget Notice</span>
            <span>
              Disqus comments widget was prevented from loading by an adblocker or privacy extension. You can join discussions directly on{' '}
              <a
                href="https://disqus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950"
              >
                Disqus Channel
              </a>.
            </span>
          </div>
        </div>
      ) : (
        <div id="disqus_thread" className="min-h-[250px]" />
      )}

      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript" rel="nofollow" className="text-teal-600 underline">
          comments powered by Disqus.
        </a>
      </noscript>
    </div>
  );
};

