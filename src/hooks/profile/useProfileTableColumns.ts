import { MultiCategoryDetails } from "@api/endpoints/profile";
import { toCapitalize } from "@utils/text";

interface UserProfileTableColumnStruct {
    title: string
    dataIndex: string
    key: string
    width: string | 'auto'
    ellipsis: boolean
    fixed: boolean
}

type UseProfileTableColumnsStruct = UserProfileTableColumnStruct[]

export const useProfileTableColumns = (categories: string[], data: MultiCategoryDetails[]): UseProfileTableColumnsStruct => {
  const [columnDetails = {} as MultiCategoryDetails] = data;

  return Object.keys(columnDetails)
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
}