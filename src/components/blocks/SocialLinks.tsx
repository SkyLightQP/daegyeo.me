import { AtSign, Globe } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const SocialLinks = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('font-light', className)}>
      <div>
        <a href="mailto:ha@daegyeo.me" className="inline-flex items-center underline cursor-pointer">
          <AtSign size={16} className="mr-1" />
          ha@daegyeo.me
        </a>
      </div>
      <div>
        <a href="https://github.com/SkyLightQP" className="inline-flex items-center underline cursor-pointer">
          <FontAwesomeIcon icon={faGithub} className="w-4 h-4 mr-1" />
          SkyLightQP
        </a>
      </div>
      <div>
        <a href="https://blog.daegyeo.me" className="inline-flex items-center underline cursor-pointer">
          <Globe size={16} className="mr-1" />
          blog.daegyeo.me
        </a>
      </div>
      <div>
        <a href="https://linkedin.com/in/daegyeom" className="inline-flex items-center underline cursor-pointer">
          <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4 mr-1" />
          daegyeom/in
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
