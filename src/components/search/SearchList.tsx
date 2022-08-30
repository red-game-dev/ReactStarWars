import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { List  } from 'antd';
import { useSearch } from '@hooks/search/useSearch'
import { MultiCategoryDetails } from '@api/endpoints/profile';
import { SearchCategory } from '@api/endpoints/search';
import useSearchCategory from '@hooks/search/atoms/useSearchCategory';
import useSearchValue from '@hooks/search/atoms/useSearchValue';
import useSearchCanRefetch from '@hooks/search/atoms/useSearchCanRefetch';
import GeneralError from '@pages/errors/general';
import SearchListItem from '@components/search/SearchListItem';

const SearchList = () => {
  const { searchCategory } = useSearchCategory();
  const { searchValue } = useSearchValue();
  const { searchCanRefetch, setSearchCanRefetch } = useSearchCanRefetch();
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

  const onRenderSearchItem = useCallback((item: MultiCategoryDetails, index: number) => (<SearchListItem item={item} index={index} isLoading={isLoading} />), [isLoading])

  useEffect(() => {
    if (searchCanRefetch && typeof remove === 'function') {
      setSearchCanRefetch(false);

      remove()
    }
  }, [remove, searchCanRefetch, searchCategory, setSearchCanRefetch])
  
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
      renderItem={onRenderSearchItem}
    />
  );
}

export default memo(SearchList);