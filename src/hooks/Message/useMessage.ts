import { message } from 'antd';

import './useMessage.less';

const useMessage = () => {
  const success = (contentText: any, duration = 2) => {
    message.success({
      content: contentText,
      className: 'success',
      duration,
    });
  };

  const error = (contentText: any, duration = 2) => {
    message.error({
      content: contentText,
      className: 'error',
      duration,
    });
  };

  return {
    success,
    error,
  };
};

export default useMessage;
