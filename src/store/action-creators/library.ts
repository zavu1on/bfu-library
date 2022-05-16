import { Dispatch } from 'redux'
import { LibraryAction, LibraryActionTypes } from '../../types/redux/library'

export const fetchLibrary = () => {
  return async (dispatch: Dispatch<LibraryAction>) => {
    try {
      // api
      setTimeout(() => {
        dispatch({
          type: LibraryActionTypes.FETCH_LIBRARY,
          payload: {
            publishers: [
              {
                id: 1,
                name: 'Комсомольская правда',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu elementum est tempus. Sit congue aliquam facilisi feugiat condimentum vitae vivamus integer et. Massa magna eu, suspendisse sit pretium mi libero, condimentum. Vulputate ullamcorper augue tincidunt id sed turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu elementum est tempus. Sit ',
                yearsOfWorking: '2021 - 2022',
                numOfNewspapers: 2000,
                previewImageUrl:
                  'https://images.unsplash.com/photo-1651721839259-bb729f965cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
              },
              {
                id: 2,
                name: 'Комсомольская правда 2',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu elementum est tempus. Sit congue aliquam facilisi feugiat condimentum vitae vivamus integer et. Massa magna eu, suspendisse sit pretium mi libero, condimentum. Vulputate ullamcorper augue tincidunt id sed turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu elementum est tempus. Sit ',
                yearsOfWorking: '2021 - 2022',
                numOfNewspapers: 2000,
                previewImageUrl:
                  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
              },
            ],
            newspapers: [
              {
                id: 1,
                name: 'Газета 1',
                publisher: {
                  id: 1,
                  name: 'Комсомольская правда',
                  description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu elementum est tempus. Sit congue aliquam facilisi feugiat condimentum vitae vivamus integer et. Massa magna eu, suspendisse sit pretium mi libero, condimentum. Vulputate ullamcorper augue tincidunt id sed turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu elementum est tempus. Sit ',
                  yearsOfWorking: '2021 - 2022',
                  numOfNewspapers: 2000,
                  previewImageUrl:
                    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
                },
                createdDate: new Date(),
                tags: ['Тег 1', 'Тег 2'],
                category: 'Полезное',
                isImportant: true,
                pages: [
                  {
                    imageUrl:
                      'https://images.unsplash.com/photo-1651721839259-bb729f965cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
                    text: `<h4>Заголовок</h4>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu elementum
                  est tempus. Sit congue aliquam facilisi feugiat condimentum vitae vivamus integer
                  et. Massa magna eu, suspendisse sit pretium mi libero, condimentum. Vulputate
                  ullamcorper augue tincidunt id sed turpis.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Amet eleifend eu elementum est tempus. Sit congue aliquam facilisi
                  feugiat condimentum vitae vivamus integer et. Massa magna eu, suspendisse sit
                  pretium mi libero, condimentum. Vulputate ullamcorper augue tincidunt id sed
                  turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu
                  elementum est tempus. Sit congue aliquam facilisi feugiat condimentum vitae
                  vivamus integer et. Massa magna eu, suspendisse sit pretium mi libero,
                  condimentum. Vulputate ullamcorper augue tincidunt id sed turpis.
                  <h4>Заголовок</h4>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu elementum
                  est tempus. Sit congue aliquam facilisi feugiat condimentum vitae vivamus integer
                  et. Massa magna eu, suspendisse sit pretium mi libero, condimentum. Vulputate
                  ullamcorper augue tincidunt id sed turpis.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Amet eleifend eu elementum est tempus. Sit congue aliquam facilisi
                  feugiat condimentum vitae vivamus integer et. Massa magna eu, suspendisse sit
                  pretium mi libero, condimentum. Vulputate ullamcorper augue tincidunt id sed
                  turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu`,
                  },
                ],
                previewImageUrl:
                  'https://images.unsplash.com/photo-1651721839259-bb729f965cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
              },
              {
                id: 2,
                name: 'Газета 2',
                publisher: {
                  id: 1,
                  name: 'Комсомольская правда',
                  description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu elementum est tempus. Sit congue aliquam facilisi feugiat condimentum vitae vivamus integer et. Massa magna eu, suspendisse sit pretium mi libero, condimentum. Vulputate ullamcorper augue tincidunt id sed turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu elementum est tempus. Sit ',
                  yearsOfWorking: '2021 - 2022',
                  numOfNewspapers: 2000,
                  previewImageUrl:
                    'https://images.unsplash.com/photo-1651721839259-bb729f965cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
                },
                createdDate: new Date(),
                tags: ['Тег 1', 'Тег 2'],
                category: 'Полезное',
                isImportant: true,
                pages: [
                  {
                    imageUrl:
                      'https://images.unsplash.com/photo-1651721839259-bb729f965cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
                    text: `<h4>Заголовок</h4>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu elementum
                  est tempus. Sit congue aliquam facilisi feugiat condimentum vitae vivamus integer
                  et. Massa magna eu, suspendisse sit pretium mi libero, condimentum. Vulputate
                  ullamcorper augue tincidunt id sed turpis.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Amet eleifend eu elementum est tempus. Sit congue aliquam facilisi
                  feugiat condimentum vitae vivamus integer et. Massa magna eu, suspendisse sit
                  pretium mi libero, condimentum. Vulputate ullamcorper augue tincidunt id sed
                  turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu
                  elementum est tempus. Sit congue aliquam facilisi feugiat condimentum vitae
                  vivamus integer et. Massa magna eu, suspendisse sit pretium mi libero,
                  condimentum. Vulputate ullamcorper augue tincidunt id sed turpis.
                  <h4>Заголовок</h4>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu elementum
                  est tempus. Sit congue aliquam facilisi feugiat condimentum vitae vivamus integer
                  et. Massa magna eu, suspendisse sit pretium mi libero, condimentum. Vulputate
                  ullamcorper augue tincidunt id sed turpis.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Amet eleifend eu elementum est tempus. Sit congue aliquam facilisi
                  feugiat condimentum vitae vivamus integer et. Massa magna eu, suspendisse sit
                  pretium mi libero, condimentum. Vulputate ullamcorper augue tincidunt id sed
                  turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu`,
                  },
                ],
                previewImageUrl:
                  'https://images.unsplash.com/photo-1651721839259-bb729f965cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
              },
              {
                id: 3,
                name: 'Газета 3',
                publisher: {
                  id: 1,
                  name: 'Комсомольская правда',
                  description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu elementum est tempus. Sit congue aliquam facilisi feugiat condimentum vitae vivamus integer et. Massa magna eu, suspendisse sit pretium mi libero, condimentum. Vulputate ullamcorper augue tincidunt id sed turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu elementum est tempus. Sit ',
                  yearsOfWorking: '2021 - 2022',
                  numOfNewspapers: 2000,
                  previewImageUrl:
                    'https://images.unsplash.com/photo-1651721839259-bb729f965cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
                },
                createdDate: new Date(),
                tags: ['Тег 1'],
                category: 'Полезное',
                isImportant: true,
                pages: [
                  {
                    imageUrl:
                      'https://images.unsplash.com/photo-1651721839259-bb729f965cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
                    text: `<h4>Заголовок</h4>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu elementum
                  est tempus. Sit congue aliquam facilisi feugiat condimentum vitae vivamus integer
                  et. Massa magna eu, suspendisse sit pretium mi libero, condimentum. Vulputate
                  ullamcorper augue tincidunt id sed turpis.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Amet eleifend eu elementum est tempus. Sit congue aliquam facilisi
                  feugiat condimentum vitae vivamus integer et. Massa magna eu, suspendisse sit
                  pretium mi libero, condimentum. Vulputate ullamcorper augue tincidunt id sed
                  turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu
                  elementum est tempus. Sit congue aliquam facilisi feugiat condimentum vitae
                  vivamus integer et. Massa magna eu, suspendisse sit pretium mi libero,
                  condimentum. Vulputate ullamcorper augue tincidunt id sed turpis.
                  <h4>Заголовок</h4>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu elementum
                  est tempus. Sit congue aliquam facilisi feugiat condimentum vitae vivamus integer
                  et. Massa magna eu, suspendisse sit pretium mi libero, condimentum. Vulputate
                  ullamcorper augue tincidunt id sed turpis.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Amet eleifend eu elementum est tempus. Sit congue aliquam facilisi
                  feugiat condimentum vitae vivamus integer et. Massa magna eu, suspendisse sit
                  pretium mi libero, condimentum. Vulputate ullamcorper augue tincidunt id sed
                  turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eleifend eu`,
                  },
                ],
                previewImageUrl:
                  'https://images.unsplash.com/photo-1651721839259-bb729f965cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
              },
            ],
            tags: ['Тег 1', 'Тег 2'],
            categories: ['Полезное'],
          },
        })

        dispatch({
          type: LibraryActionTypes.SET_LOADING_STATUS,
          payload: false,
        })
      }, 1000)
    } catch (e) {
      dispatch({
        type: LibraryActionTypes.SET_LOADING_STATUS,
        payload: true,
      })
    }
  }
}
