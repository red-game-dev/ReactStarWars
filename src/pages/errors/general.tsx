import { Button, Result  } from 'antd';

const GeneralError = ({ onRetry = () => {} }) => {
  return (
    <Result
      status="error"
      title="Oops! Something went wrong!"
      subTitle="Please try again"
      { 
        ...typeof onRetry === 'function' && 
        {
          extra: [
            <Button type="primary" key="home" onClick={onRetry}>
              Retry
            </Button>,
          ]
        }
      }
    />
  )
}

export default GeneralError;