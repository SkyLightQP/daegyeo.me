/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faCode, faLink, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ContentBlock from '../ContentBlock';
import { Title } from '../Typography';

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
          onKeyPress={(e) => e.key === 'Enter' && onEmailClick()}
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

      <Title>
        <a href="https://github.com/SkyLightQP/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size="sm" /> GitHub
        </a>
      </Title>

      <Title>
        <a href="https://blog.skylightqp.kr/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLink} size="sm" /> Blog
        </a>
      </Title>

      <Title>
        <a href="https://www.acmicpc.net/user/combbm" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faCode} size="sm" /> Baekjoon
        </a>
      </Title>

      <Title>
        <a href="https://til.skylightqp.kr/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faPencilAlt} size="sm" /> Today I Learned
        </a>
      </Title>
    </ContentBlock>
  );
};

export default MoreLink;
