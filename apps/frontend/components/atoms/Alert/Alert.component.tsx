import styled from 'styled-components';
import { AlertStatus, getAlertColor } from './alert.constants';
import { motion } from 'motion/react';

type AlertProps = {
  status: AlertStatus;
  title: string;
  description: string;
};

export function Alert({ status = AlertStatus.ERROR, ...props }: AlertProps) {
  return (
    <Wrapper
      status={status}
      animate={{
        rotate: [0, 1.2, 0],
        scale: [1.1, 1],
        ease: [0, 0.71, 0.2, 1.01],
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <Title>{props.title}</Title>
      <Description>{props.description}</Description>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)<Pick<AlertProps, 'status'>>`
  background: ${(props) => getAlertColor(props.status).colorScheme};
  border-radius: 5px;
  padding: 10px 20px;
  max-width: 340px;
  color: ${(props) => getAlertColor(props.status).color};
  box-shadow: 0px 0px 1px ${(props) => getAlertColor(props.status).border};
`;

const Title = styled.b`
  font-size: 15px;
`;

const Description = styled.p`
  font-size: 12px;
  padding-top: 6px;
`;
