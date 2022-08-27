import React, { memo } from 'react';
import { Link } from "react-router-dom";
import { Skeleton, List  } from 'antd';
import { MultiCategoryDetails } from '@api/endpoints/profile';
import { useGetProfileEpisodesIds } from '@hooks/profile/useGetProfileEpisodeIds';

interface SearchListItemStruct {
  isLoading?: boolean | undefined, 
  index: number;
  item: MultiCategoryDetails;
}

function SearchListItem({ isLoading, index, item }: SearchListItemStruct) {
  const episodesIds = useGetProfileEpisodesIds(item.films);

  return (
  <List.Item>
    <Skeleton title={false} loading={isLoading} active>
      <List.Item.Meta
        key={index}
        title={<Link to={`${item.url?.replace('https://swapi.dev/api', '')}`}>{item.name || item.title}</Link> }
        description={(item.films && `Appears in episodes ${episodesIds.join(',')}`) || 'No episodes founds'}
      />
    </Skeleton>
  </List.Item>)
}

export default memo(SearchListItem);