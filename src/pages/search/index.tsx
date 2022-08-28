import { useCallback } from 'react';
import { Outlet, useParams, useNavigate } from "react-router-dom";
import type { RadioChangeEvent } from 'antd';
import { Radio, Input  } from 'antd';
import {  SearchCategory } from '@api/endpoints/search';
import useSearchCategory from '@hooks/search/atoms/useSearchCategory';
import useSearchValue from '@hooks/search/atoms/useSearchValue';
import useDidMount from 'beautiful-react-hooks/useDidMount';
import useThrottledCallback from 'beautiful-react-hooks/useThrottledCallback';
import useDebouncedCallback from 'beautiful-react-hooks/useDebouncedCallback';
import { useNavQuery } from '@hooks/navigation/useNavQuery';
import useSearchCanRefetch from '@hooks/search/atoms/useSearchCanRefetch';


const { Search } = Input;

function MainSearch() {
  const { searchValue, setSearchValue } = useSearchValue();
  const { setSearchCanRefetch } = useSearchCanRefetch();
  const { searchCategory, setSearchCategory } = useSearchCategory();
  const { category } = useParams<"category">();
  const { search: querySearchValue } = useNavQuery('search');
  const navigation = useNavigate();

  useDidMount(() => {
    if (category) {
      setSearchCategory(category as SearchCategory)
    }

    if (querySearchValue) {
      setSearchValue(querySearchValue)
    }

    if (category && querySearchValue) {
      navigation(`/search/${category}?search=${querySearchValue}`, {
        replace: true
      })
    }
  })

  const onChange = useThrottledCallback(
    (e: RadioChangeEvent) => {
      const newCategory = e.target.value;
      
      setSearchCategory(newCategory)

      if (newCategory && querySearchValue) {
        navigation(`/search/${newCategory}?search=${querySearchValue}`, {
          replace: true,
        });
      }
    },
  );

  useDebouncedCallback(
    () => {
      setSearchCanRefetch(category !== searchCategory || searchValue !== querySearchValue)

      if (searchCategory && searchValue) {
        navigation(`/search/${searchCategory}?search=${searchValue}`, {
          replace: true,
        });
      }
    },
    [searchValue, querySearchValue, category, searchCategory],
  );

  const onSearch = useCallback((value: string) => {
    if (value) {
      setSearchValue(value);
      setSearchCanRefetch(category !== searchCategory || value !== querySearchValue)

      navigation(`/search/${searchCategory}?search=${value}`, {
        replace: true,
      });
    }
  },  [setSearchValue, setSearchCanRefetch, category, searchCategory, querySearchValue, navigation]);

  return (  
    <div>
      <Search placeholder="Search..." onSearch={onSearch} defaultValue={querySearchValue} enterButton minLength={1} />

      <Radio.Group onChange={onChange} defaultValue={searchCategory || category} value={searchCategory || category}>
        <Radio.Button defaultChecked={searchCategory === SearchCategory.ALL || category === SearchCategory.ALL} value={SearchCategory.ALL}>All</Radio.Button>
        <Radio.Button defaultChecked={searchCategory === SearchCategory.PEOPLE || category === SearchCategory.PEOPLE} value={SearchCategory.PEOPLE}>People</Radio.Button>
        <Radio.Button defaultChecked={searchCategory === SearchCategory.PLANETS || category === SearchCategory.PLANETS} value={SearchCategory.PLANETS}>Planets</Radio.Button>
        <Radio.Button defaultChecked={searchCategory === SearchCategory.STARSHIPS || category === SearchCategory.STARSHIPS} value={SearchCategory.STARSHIPS}>Starships</Radio.Button>
        <Radio.Button defaultChecked={searchCategory === SearchCategory.VEHICLES || category === SearchCategory.VEHICLES} value={SearchCategory.VEHICLES}>Vehicles</Radio.Button>
      </Radio.Group>

      <Outlet />
    </div>
  );
}

export default MainSearch;