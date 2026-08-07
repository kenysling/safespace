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
    const identifier = pageIdentifier || 'safespace_renovation_discussion';

    window.disqus_config = function () {
      // @ts-ignore
      this.page.url = canonicalUrl;
      // @ts-ignore
      this.page.identifier = identifier;
    };

    const disqusEmbedUrl = 'https://health-disqus.disqus.com/embed.js';
    const embedScriptId = 'disqus-embed-script';
    const countScriptId = 'disqus-count-script';

    if (document.getElementById(embedScriptId)) {
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
      }
    } else {
      const script = document.createElement('script');
      script.id = embedScriptId;
      script.src = disqusEmbedUrl;
      script.setAttribute('data-timestamp', (+new Date()).toString());
      script.async = true;
      script.onerror = () => {
        console.warn('Disqus script failed to load or was blocked.');
        setLoadError(true);
      };
      (document.head || document.body).appendChild(script);
    }

    if (!document.getElementById(countScriptId)) {
      const countScript = document.createElement('script');
      countScript.id = countScriptId;
      countScript.src = '//health-disqus.disqus.com/count.js';
      countScript.async = true;
      countScript.onerror = () => {
        console.warn('Disqus count script failed to load.');
      };
      (document.head || document.body).appendChild(countScript);
    }
  }, [pageUrl, pageIdentifier]);

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 max-w-7xl mx-auto w-full" id="disqus-community-section">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <MessageSquare className="w-5 h-5 text-sky-600" />
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 font-semibold ml-auto">
          Powered by Disqus
        </span>
      </div>

      <p className="text-sm text-slate-600">
        Share feedback, ask questions about Singapore interior design firms, HDB renovation contractor experiences, and join the homeowner discussion powered by Disqus.
      </p>

      {loadError ? (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <span className="font-bold block">Community Comments Widget Notice</span>
            <span>
              Disqus comments widget was prevented from loading or blocked. You can view or join discussions directly on{' '}
              <a
                href="https://health-disqus.disqus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950"
              >
                Disqus Discussion Board
              </a>.
            </span>
          </div>
        </div>
      ) : (
        <div id="disqus_thread" className="min-h-[200px]" />
      )}

      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript" rel="nofollow" className="text-sky-600 underline">
          comments powered by Disqus.
        </a>
      </noscript>
    </section>
  );
};


