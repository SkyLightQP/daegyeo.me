/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faCode, faLink, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import ContentBlock from '../ContentBlock';
import { Title } from '../Typography';

const links = [
  {
    title: 'GitHub',
    link: 'https://github.com/SkyLightQP/',
    icon: faGithub
  },
  {
    title: 'Blog',
    link: 'https://blog.skylightqp.kr/',
    icon: faLink
  },
  {
    title: 'Baekjoon',
    link: 'https://www.acmicpc.net/user/combbm',
    icon: faCode
  },
  {
    title: 'Today I Learned',
    link: 'https://til.skylightqp.kr/',
    icon: faPencilAlt
  },
  {
    title: 'Linkedin',
    link: 'https://www.linkedin.com/in/daegyeom/',
    icon: faLinkedin
  }
];

const MoreLink: React.FC = () => {
  const onEmailClick = () => {
    window.open('mailto:combbm@gmail.com');
  };

  return (
    <ContentBlock title="더 알아보기">
      <Title>
        <span
          role="button"
          tabIndex={0}
          onKeyUp={(e) => e.key === 'Enter' && onEmailClick()}
          onClick={onEmailClick}
          css={css`
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          `}
        >
          <FontAwesomeIcon icon={faAt} size="sm" /> Email
        </span>
      </Title>

      {links.map((link) => (
        <Title key={`links-${link.title.replaceAll(' ', '').toLowerCase()}`}>
          <a href={link.link} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={link.icon} size="sm" /> {link.title}
          </a>
        </Title>
      ))}
    </ContentBlock>
  );
};

export default MoreLink;
