import React, { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

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
  useEffect(() => {
    const canonicalUrl = pageUrl || window.location.href;
    const identifier = pageIdentifier || window.location.pathname;

    window.disqus_config = function () {
      // @ts-ignore
      this.page.url = canonicalUrl;
      // @ts-ignore
      this.page.identifier = identifier;
    };

    const disqusEmbedUrl = 'https://health-disqus.disqus.com/embed.js';

    if (window.DISQUS) {
      // If Disqus is already loaded, reset it with new page config
      window.DISQUS.reset({
        reload: true,
        config: function () {
          // @ts-ignore
          this.page.url = canonicalUrl;
          // @ts-ignore
          this.page.identifier = identifier;
        },
      });
    } else {
      // Inject Disqus script
      const script = document.createElement('script');
      script.id = 'disqus-embed-script';
      script.src = disqusEmbedUrl;
      script.setAttribute('data-timestamp', (+new Date()).toString());
      script.async = true;
      (document.head || document.body).appendChild(script);
    }

    // Load count script if not present
    if (!document.getElementById('dsq-count-scr')) {
      const countScript = document.createElement('script');
      countScript.id = 'dsq-count-scr';
      countScript.src = '//health-disqus.disqus.com/count.js';
      countScript.async = true;
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

      {/* Disqus Thread Container */}
      <div id="disqus_thread" className="min-h-[250px]" />

      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript" rel="nofollow" className="text-teal-600 underline">
          comments powered by Disqus.
        </a>
      </noscript>
    </div>
  );
};
