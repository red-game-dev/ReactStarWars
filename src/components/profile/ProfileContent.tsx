import { Descriptions } from 'antd';
import { MultiCategoryDetails } from '@api/endpoints/profile';
import { toCapitalize } from '@utils/text';

const ProfileContent = ({ data = {} as Partial<MultiCategoryDetails>, column = 2 }) => (
  <Descriptions size="small" column={column}>
    {
      Object.keys(data)
        .map((key: string, index: number) => 
          <Descriptions.Item key={index} label={toCapitalize(key.replace(/([_])/gi, ' '))}>
            {data[key as keyof MultiCategoryDetails] as string}
          </Descriptions.Item>
        )
    }
  </Descriptions>
);

export default ProfileContent;