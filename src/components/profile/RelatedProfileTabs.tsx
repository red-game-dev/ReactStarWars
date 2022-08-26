import { Tabs  } from 'antd';
import { toCapitalize } from '@utils/text';
import RelatedProfileList from "@components/profile/RelatedProfileList";
import { MultiCategoryDetails } from '@api/endpoints/profile';
import { SearchCategory } from '@api/endpoints/search';

const { TabPane } = Tabs;
function RelatedProfileTabs({ currentCategory = '', profileId = 0, categories = [] as SearchCategory[], profiles = [] as unknown as { [x: string]:  MultiCategoryDetails[] } }) {
  return (
    <Tabs defaultActiveKey="1">
      {
        Object.keys(profiles)
        .filter((key: string) => key !== currentCategory)
        .map((relatedProfileCategory: string, index) => 
          <TabPane tab={toCapitalize(relatedProfileCategory.toString().replace(/([_])/gi, ' '))} key={(index + 1)}>
            <RelatedProfileList categories={categories} profileId={profileId} list={profiles[relatedProfileCategory]}/>
          </TabPane>)
      }
    </Tabs>
  )
} 

export default RelatedProfileTabs;