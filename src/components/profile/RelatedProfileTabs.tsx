import { Tabs  } from 'antd';
import { toCapitalize } from '@utils/text';
import RelatedProfileList from "@components/profile/RelatedProfileList";
import { memo } from 'react';

const { TabPane } = Tabs;

interface RelatedProfileTabsStruct {
  currentCategory: string
  profileId: number
  categories: string[]
  profiles: { 
    [x: string]: string[] 
  }
}

function RelatedProfileTabs({ currentCategory, profileId, categories, profiles }: RelatedProfileTabsStruct) {
  return (
    <Tabs defaultActiveKey="1">
      {
        Object.keys(profiles)
        .filter((key: string) => key !== currentCategory)
        .map((relatedProfileCategory: string, index) => 
          <TabPane tab={toCapitalize(relatedProfileCategory.toString().replace(/([_])/gi, ' '))} key={(index + 1)}>
            <RelatedProfileList categories={categories} profileId={profileId} endpointsRelated={profiles[relatedProfileCategory]}/>
          </TabPane>)
      }
    </Tabs>
  )
} 

export default memo(RelatedProfileTabs);