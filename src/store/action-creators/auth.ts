import { INewspaper } from './../../types/library'
import { Dispatch } from 'redux'
import { AuthAction, AuthActionTypes } from '../../types/redux/auth'

export const login = (login: string, password: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    // fetch
    // get tokens
    // try {...} catch (e) {...}

    dispatch({
      type: AuthActionTypes.LOGIN,
      payload: {
        login,
        id: 1,
        role: 'reader',
        email: 'test@mail.ru',

        favorites: [
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
                  'https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
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
              'https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
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
                'https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            },
            createdDate: new Date(),
            tags: ['Тег 1', 'Тег 2'],
            category: 'Полезное',
            isImportant: true,
            pages: [
              {
                imageUrl:
                  'https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
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
              'https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
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
                'https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            },
            createdDate: new Date(),
            tags: ['Тег 1'],
            category: 'Полезное',
            isImportant: true,
            pages: [
              {
                imageUrl:
                  'https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
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
              'https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
          },
        ],
        postsEdited: 0,

        firstName: 'Михаил',
        lastName: 'Алексеев',
        patronymicName: 'Михайлович',

        error: null,
      },
    })

    localStorage.setItem('access-token', 'access-token')
    localStorage.setItem('refresh-token', 'refresh-token')
  }
}

export const logout = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.LOGOUT,
      payload: null,
    })

    localStorage.removeItem('access-token')
    localStorage.removeItem('refresh-token')
  }
}

export const clearError = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.CLEAR_ERROR,
      payload: null,
    })
  }
}

export const checkIsFavorite = (newspaper: INewspaper) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    // fetch

    dispatch({
      type: AuthActionTypes.CHECK_IS_FAVORITE,
      payload: newspaper,
    })
  }
}
