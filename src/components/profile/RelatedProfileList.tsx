import { Table  } from 'antd';
import { MultiCategoryDetails } from '@api/endpoints/profile';
import { SearchCategory } from '@api/endpoints/search';
import { useProfile } from '@hooks/profile/useProfile';
import GeneralError from '@pages/errors/general';
import { toCapitalize } from '@utils/text';

function RelatedProfileList({ categories = [], profileId, list = [] }: any) {
  let currentCategory: string | null = null;

  const ids = list.map((endpoint: string) => {
    const [category, currentId] = endpoint.replace('https://swapi.dev/api', '').split('/').filter((item) => item);
    
    currentCategory = category;

    return currentId;
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
  
  if (isError) {
    return (<GeneralError />)
  }

  if (!data.length || isLoading) {
    return (<Table loading={isLoading} columns={[]} dataSource={[]} pagination={false} />)
  }

  const displayData = data
    .map((currentProfile: MultiCategoryDetails) => Object.keys(currentProfile)
      .filter((key: string) => ![
        ...categories,
        'homeworld',
        'characters',
        'url',
      ].includes(key))
      .reduce((previous: any, currentValue) => {
        previous[currentValue] = currentProfile[currentValue as keyof MultiCategoryDetails];
        return previous;
      }, {} as unknown as { [x: string]: string[] })
    )
    .map((currentProfile: MultiCategoryDetails, index) => ({
      ...currentProfile,
      key: `${(currentProfile.name || currentProfile.title || '').split(' ').join('-')}-${index}`,
    })); 

    const [currentProfile = [] as unknown as MultiCategoryDetails,] = data;

    const columns = Object.keys(currentProfile)
      .filter((key: string) => ![
        ...categories,
        'homeworld',
        'characters',
        'url',
      ].includes(key))
      .map((key, index) => ({
        title: toCapitalize(key?.toString().replace(/([_])/gi, ' ')),
        dataIndex: key,
        key: `${key}-${index}`,
        width: 'auto',
        ellipsis: true,
        fixed: true,
    }));

    console.log('displayData', displayData)

  return (<Table columns={columns} dataSource={displayData} 
    pagination={{
      disabled: !displayData || isLoading || !displayData?.length
    }} />);
}

export default RelatedProfileList;