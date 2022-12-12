import { Button } from '@components/atoms';
import {
  faFacebook,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

type SocialShareProps = {
  url?: string;
};

function getShareInfo(to, url) {
  const message = 'Check out this recording!';
  const hashtags = 'recording';

  switch (to) {
    case 'whatsapp':
      return {
        url: `https://api.whatsapp.com/send?text=${message} ${url}`,
      };
    case 'twitter':
      return {
        url: `https://twitter.com/intent/tweet?url=${url}&text=${message}&hashtags=${hashtags}`,
      };

    case 'facebook':
      return {
        url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      };
    default:
      console.error('Unknown social network', to);
      break;
  }
}

export function SocialShare(props: SocialShareProps) {
  function handleShare(to) {
    const { url } = getShareInfo(to, props.url);
    window.open(url, '_blank');
  }

  return (
    <Wrapper>
      <StyledButton onClick={() => handleShare('whatsapp')} color="#26B840">
        <FontAwesomeIcon icon={faWhatsapp as any} size="xl" />
      </StyledButton>
      <StyledButton onClick={() => handleShare('facebook')} color="#3b5998">
        <FontAwesomeIcon icon={faFacebook as any} size="lg" />
      </StyledButton>
      <StyledButton onClick={() => handleShare('twitter')} color="#1da1f2">
        <FontAwesomeIcon icon={faTwitter as any} size="lg" />
      </StyledButton>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const StyledButton = styled(Button)`
  margin-right: 4px;
  width: 44px;
  padding-left: 8px;
  padding-right: 8px;
`;
