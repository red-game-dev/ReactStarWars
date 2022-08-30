import { useNavigate } from "react-router-dom";
import { Button, Result  } from 'antd';

const NoMatch = () => {
  const navigation = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={() => {
        navigation(`/`, {
          replace: true,
        });
      }}>Back Home</Button>}
    />
  );
}

export default NoMatch;