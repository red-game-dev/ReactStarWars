import { Table  } from 'antd';
import { MultiCategoryDetails } from '@api/endpoints/profile';
import { SearchCategory } from '@api/endpoints/search';
import { useProfile } from '@hooks/profile/useProfile';
import GeneralError from '@pages/errors/general'
import { useProfileTableColumns } from '@hooks/profile/useProfileTableColumns';
import { useProfileTableRows } from '@hooks/profile/useProfileTableRows';
import { useGetProfileCategories } from '@hooks/profile/useGetProfileCategories';
import { useGetProfileIds } from '@hooks/profile/useGetProfileIds';
import { memo } from 'react';

interface RelatedProfileListStruct {
  categories?: string[]
  profileId: number,
  endpointsRelated: string[]
}

const RelatedProfileList = ({ categories = [], profileId, endpointsRelated = [] }: RelatedProfileListStruct) => {
  const category = useGetProfileCategories(endpointsRelated);
  const ids = useGetProfileIds(endpointsRelated);

  const { 
    isLoading,
    isError,
    data,
  } = useProfile<MultiCategoryDetails>({
    category: category as unknown as SearchCategory,
    profileId,
    subIds: ids,
  });
  const displayData = useProfileTableRows(categories, data)
  const columns = useProfileTableColumns(categories, data)
  
  if (isError) {
    return (<GeneralError />)
  }

  if (!data.length || isLoading) {
    return (<Table loading={isLoading} columns={[]} dataSource={[]} pagination={false} />)
  }

  return (<Table columns={columns} dataSource={displayData} 
    pagination={{
      disabled: !displayData || isLoading || !displayData?.length
    }} />);
}

export default memo(RelatedProfileList);