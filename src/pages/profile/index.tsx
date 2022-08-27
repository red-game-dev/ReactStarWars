import { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader, Result, Skeleton  } from 'antd';
import { MultiCategoryDetails } from '@api/endpoints/profile';
import { SearchCategory } from '@api/endpoints/search';
import { useProfile } from '@hooks/profile/useProfile';
import ProfileContent from '@components/profile/ProfileContent'
import RelatedProfileTabs from "@components/profile/RelatedProfileTabs";
import GeneralError from "@pages/errors/general";
import { categoryToReadable } from "@utils/readable";

const viewableCategories = Object.values(SearchCategory).filter((currentCategory) => currentCategory !== SearchCategory.ALL);

function Profile() {
  let { id } = useParams<"id">();
  let { category = '' } = useParams<"category">();
  const navigation = useNavigate();

  const profileId = parseInt(id || "0");
  
  const { 
    isLoading,
    isError,
    data,
  } = useProfile<MultiCategoryDetails>({
    category: category as SearchCategory,
    profileId,
    subIds: [profileId],
  });

  const onErrorRetry = useCallback(() => {
    navigation(`/${category}/${id}`, {
      replace: true,
    });
  }, [category, id, navigation])
  
  if (isLoading) {
    return (<Skeleton active />)
  }

  if (isError) {
    return (<GeneralError onRetry={onErrorRetry} />)
  }

  if (data.length === 0) {
    return (<Result title="Seems there is no data" />)
  }

  const [currentProfile] = data;

  const relatedProfiles = ([...viewableCategories, 'homeworld'] as unknown as (keyof MultiCategoryDetails)[])
  .filter((item: keyof MultiCategoryDetails) => typeof currentProfile[item] === 'object' && ((currentProfile[item] || []) as string[]).length > 0)
  .reduce((previous, currentValue) => {

    if (!previous[currentValue]){
      previous[currentValue] = [];
    }

    if (typeof currentProfile[currentValue] === 'string') {
      previous[currentValue].push(...[currentProfile[currentValue] as string])
    } else if (typeof currentProfile[currentValue] === 'object') {
      previous[currentValue].push(...(currentProfile[currentValue] as string[] || []))
    }

    return previous;
  }, {} as any)

  const displayData = Object.keys(currentProfile)
    .filter((key: string) => ![
      ...viewableCategories,
      'homeworld',
      'url',
      'name'
    ].includes(key))
    .reduce((previous: any, currentValue) => {
      previous[currentValue] = currentProfile[currentValue as keyof MultiCategoryDetails];
  
      return previous;
    }, {} as unknown as { [x: string]: string[] }) as Partial<MultiCategoryDetails>; 

  return (
    <PageHeader
        title={currentProfile.name || currentProfile.title}
        subTitle={`A ${categoryToReadable(category)}`}
        footer={<RelatedProfileTabs currentCategory={category} categories={viewableCategories} profileId={profileId} profiles={relatedProfiles} />}
      >
        <ProfileContent data={displayData} />
    </PageHeader>
  );
}

export default Profile;