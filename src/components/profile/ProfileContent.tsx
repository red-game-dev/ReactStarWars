import { memo } from 'react';
import { Descriptions } from 'antd';
import { MultiCategoryDetails } from '@api/endpoints/profile';
import { toCapitalize } from '@utils/text';

interface ProfileContentStruct {
  data: {
    [Property in keyof Partial<MultiCategoryDetails>]: Partial<MultiCategoryDetails>[Property];
  },
  column?: number
}

const ProfileContent = ({ data, column = 2 }: ProfileContentStruct) => (
  <Descriptions size="small" column={column}>
    {
      Object.keys(data)
        .map((key, index: number) => 
          <Descriptions.Item key={index} label={toCapitalize(key.toString().replace(/([_])/gi, ' '))}>
            {data[key as keyof MultiCategoryDetails]?.toString()}
          </Descriptions.Item>
        )
    }
  </Descriptions>
);

export default memo(ProfileContent);