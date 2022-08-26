import React, { useCallback } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Skeleton, List  } from 'antd';
import { useSearch } from '@hooks/search/useSearch'
import { MultiCategoryDetails } from '@api/endpoints/profile';
import { SearchCategory } from '@api/endpoints/search';
import useSearchCategory from '@hooks/search/atoms/useSearchCategory';
import useSearchValue from '@hooks/search/atoms/useSearchValue';
import useSearchCanRefetch from '@hooks/search/atoms/useSearchCanRefetch';
import GeneralError from '@pages/errors/general';

function SearchList() {
  const { searchCategory } = useSearchCategory();
  const { searchCanRefetch, setSearchCanRefetch } = useSearchCanRefetch();
  const { searchValue } = useSearchValue();
  const navigation = useNavigate();

  const { 
    isLoading,
    isError,
    data,
    remove,
  } = useSearch<MultiCategoryDetails>({
    category: searchCategory as SearchCategory,
    searchValue,
    canRefetch: searchCanRefetch,
  });

  if (searchCanRefetch && typeof remove === 'function') {
    setSearchCanRefetch(false);

    remove()
  }
  
  const onErrorRetry = useCallback(() => {
    navigation(`/search/${searchCategory}?search=${searchValue}`, {
      replace: true,
    });
  }, [searchCategory, searchValue, navigation])
  
  if (isError) {
    return (<GeneralError onRetry={onErrorRetry} />)
  }

  return (
    <List
      loading={isLoading}
      itemLayout="horizontal"
      pagination={{
        disabled: !data || isLoading || !data?.length
      }}
      dataSource={data}
      renderItem={(item: MultiCategoryDetails, index) => (
        <List.Item>
          <Skeleton title={false} loading={isLoading} active>
            <List.Item.Meta
              key={index}
              title={<Link to={`${item.url?.replace('https://swapi.dev/api', '')}`}>{item.name || item.title}</Link> }
              description={(item.films && `Appears in episodes ${item.films?.map((item) => item.match(/\d+/)).join(', ')}`) || 'No episodes founds'}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
}

export default SearchList;