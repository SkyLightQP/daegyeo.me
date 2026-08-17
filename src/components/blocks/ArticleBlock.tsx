import { ArrowRight } from 'lucide-react';
import { HTMLAttributes } from 'react';

const ArticleBlock = ({ className, children, title }: HTMLAttributes<HTMLDivElement> & { title: string }) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      {children}

      <div className="mt-8">
        <a
          href="https://blog.daegyeo.me"
          className="group inline-flex items-center text-gray-700 hover:text-zinc-900 transition-colors duration-200"
        >
          Read more articles
          <ArrowRight className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5" size={16} />
        </a>
      </div>
    </div>
  );
};

export default ArticleBlock;
