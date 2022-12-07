import styled from 'styled-components';
import { AlertStatus, getAlertColorScheme } from './alert.constants';

type AlertProps = {
  status: AlertStatus;
  title: string;
  description: string;
};

export function Alert({ status = AlertStatus.ERROR, ...props }: AlertProps) {
  return (
    <Wrapper status={status}>
      <Title>{props.title}</Title>
      <Description>{props.description}</Description>
    </Wrapper>
  );
}

const Wrapper = styled.div<Pick<AlertProps, 'status'>>`
  background: ${props => getAlertColorScheme(props.status)};
  border-radius: 5px;
  padding: 7px 10px;
  border: 1px solid gray;
`;

const Title = styled.b``;

const Description = styled.p`
  padding-top: 6px;
`;
