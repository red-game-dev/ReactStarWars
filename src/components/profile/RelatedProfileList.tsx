import { Table  } from 'antd';
import { MultiCategoryDetails } from '@api/endpoints/profile';
import { SearchCategory } from '@api/endpoints/search';
import { useProfile } from '@hooks/profile/useProfile';
import GeneralError from '@pages/errors/general'
import { useProfileTableColumns } from '@hooks/profile/useProfileTableColumns';
import { useProfileTableRows } from '@hooks/profile/useProfileTableRows';

interface RelatedProfileListStruct {
  categories?: string[]
  profileId: number,
  endpointsRelated: string[]
}

function RelatedProfileList({ categories = [], profileId, endpointsRelated = [] }: RelatedProfileListStruct) {
  let currentCategory: string | null = null;

  const ids = endpointsRelated.map((endpoint: string) => {
    const [category, currentId] = endpoint.replace('https://swapi.dev/api', '').split('/').filter((item) => item);
    
    currentCategory = category;

    return parseInt(currentId);
  })


  const { 
    isLoading,
    isError,
    data,
  } = useProfile<MultiCategoryDetails>({
    category: currentCategory as unknown as SearchCategory,
    profileId,
    subIds: ids,
  });
  const displayData = useProfileTableRows(categories, data)
  const columns = useProfileTableColumns(categories, data)

  console.log('data', data, displayData)
  
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

export default RelatedProfileList;