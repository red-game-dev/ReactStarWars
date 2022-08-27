import React from 'react';
import { Link } from "react-router-dom";
import { Skeleton, List  } from 'antd';
import { MultiCategoryDetails } from '@api/endpoints/profile';

interface SearchListItemStruct {
  isLoading: boolean | undefined, 
  index: number;
  item: MultiCategoryDetails;
}

function SearchListItem({ isLoading = false, index, item }: SearchListItemStruct) {
  return (
  <List.Item>
    <Skeleton title={false} loading={isLoading} active>
      <List.Item.Meta
        key={index}
        title={<Link to={`${item.url?.replace('https://swapi.dev/api', '')}`}>{item.name || item.title}</Link> }
        description={(item.films && `Appears in episodes ${item.films?.map((item) => item.match(/\d+/)).join(', ')}`) || 'No episodes founds'}
      />
    </Skeleton>
  </List.Item>)
}

export default SearchListItem;