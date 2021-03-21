import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getUsersOrders: Array<GetOrdersResponse>;
  getOrders: Array<GetOrdersResponse>;
  getOrderById: GetOrdersResponse;
  getProducts: Array<ProductsWithImages>;
  apiGetProducts: Array<ProductsWithImages>;
  getProduct: ProductsWithImages;
  apiGetProduct: ProductsWithImages;
  getApiUsers: Array<ApiUser>;
  getCurrUser: Users;
  getCoupons: Array<Coupons>;
  getAnnouncements: Array<Announcements>;
  getMaintenance: Scalars['Boolean'];
  getSocials: Array<Socials>;
  getSections: Array<Sections>;
  getSectionById: Sections;
  getProductsSections: Array<SectionsOrNull>;
  getSectionsProducts: Array<ProductsWithImages>;
  getProductsOptions: Array<Options>;
};


export type QueryGetOrderByIdArgs = {
  order_id: Scalars['Float'];
};


export type QueryGetProductArgs = {
  product_id: Scalars['Float'];
};


export type QueryApiGetProductArgs = {
  product_id: Scalars['Float'];
};


export type QueryGetSocialsArgs = {
  component: Scalars['String'];
};


export type QueryGetSectionByIdArgs = {
  section_id: Scalars['Float'];
};


export type QueryGetProductsSectionsArgs = {
  product_id: Scalars['Float'];
};


export type QueryGetSectionsProductsArgs = {
  section_id: Scalars['Float'];
};


export type QueryGetProductsOptionsArgs = {
  product_id: Scalars['Float'];
};

export type GetOrdersResponse = {
  __typename?: 'GetOrdersResponse';
  products?: Maybe<Array<OrdersProductsWithImages>>;
  order_id: Scalars['Float'];
  tracking_num?: Maybe<Scalars['String']>;
  order_total?: Maybe<Scalars['Float']>;
  coupon?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['String']>;
  shipping?: Maybe<Scalars['String']>;
  warning?: Maybe<Scalars['String']>;
  date_of_purchase?: Maybe<Scalars['String']>;
};

export type OrdersProductsWithImages = {
  __typename?: 'OrdersProductsWithImages';
  product_id: Scalars['Int'];
  name: Scalars['String'];
  desc: Scalars['String'];
  price: Scalars['Int'];
  stock: Scalars['Int'];
  org_stock?: Maybe<Scalars['Int']>;
  exp_date?: Maybe<Scalars['String']>;
  quantityOrdered: Scalars['Float'];
  productSubtotal?: Maybe<Scalars['Float']>;
  images?: Maybe<Array<Images>>;
};

export type Images = {
  __typename?: 'Images';
  img_id: Scalars['Float'];
  img_url: Scalars['String'];
  index: Scalars['Float'];
};

export type ProductsWithImages = {
  __typename?: 'ProductsWithImages';
  product_id: Scalars['Int'];
  name: Scalars['String'];
  desc: Scalars['String'];
  price: Scalars['Int'];
  stock: Scalars['Int'];
  org_stock?: Maybe<Scalars['Int']>;
  exp_date?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Images>>;
  hidden: Scalars['Boolean'];
};

export type ApiUser = {
  __typename?: 'ApiUser';
  uuid: Scalars['Float'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Users = {
  __typename?: 'Users';
  uuid: Scalars['Float'];
  user_id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type Coupons = {
  __typename?: 'Coupons';
  coupon_id: Scalars['String'];
  coupon_name: Scalars['String'];
  discount?: Maybe<Scalars['String']>;
};

export type Announcements = {
  __typename?: 'Announcements';
  id: Scalars['String'];
  text: Scalars['String'];
};

export type Socials = {
  __typename?: 'Socials';
  id: Scalars['Int'];
  index: Scalars['Int'];
  component: Scalars['String'];
  display: Scalars['Boolean'];
  social_logo: Scalars['String'];
  social_url: Scalars['String'];
};

export type Sections = {
  __typename?: 'Sections';
  section_id: Scalars['Int'];
  name: Scalars['String'];
  thumbnail: Scalars['String'];
};

export type SectionsOrNull = {
  __typename?: 'SectionsOrNull';
  section_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
};

export type Options = {
  __typename?: 'Options';
  option_id: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Int'];
  stock: Scalars['Int'];
  index: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  editTracking: Scalars['Boolean'];
  paypalCheckout: Scalars['String'];
  addPaypalOrder: Scalars['Boolean'];
  checkout: Scalars['String'];
  toggleProductDisplay: Scalars['Boolean'];
  addProduct: Scalars['String'];
  deleteProduct: Scalars['Boolean'];
  updateProduct: Scalars['Boolean'];
  addImgToProduct: Scalars['Boolean'];
  removeImgFromProduct: Scalars['Boolean'];
  apiLogin: AuthResponse;
  deleteApiUser: Scalars['Boolean'];
  addApiUser: Scalars['Boolean'];
  removeWarning: Scalars['Boolean'];
  login: AuthResponse;
  addCoupon: Scalars['Boolean'];
  deleteCoupon: Scalars['Boolean'];
  validateCoupon: Scalars['String'];
  addAnnouncement: Scalars['Boolean'];
  deleteAnnouncement: Scalars['Boolean'];
  toggleMaintenance: Scalars['Boolean'];
  maintenanceLogin: AuthResponse;
  updateSocialUrl: Scalars['Boolean'];
  toggleSocialDisplay: Scalars['Boolean'];
  initSocials: Scalars['Boolean'];
  addSection: Scalars['Boolean'];
  deleteSection: Scalars['Boolean'];
  addProductToSection: Scalars['String'];
  removeProductFromSection: Scalars['Boolean'];
  updateSection: Scalars['Boolean'];
  addOptionToProduct: Scalars['Boolean'];
  deleteOptions: Scalars['Boolean'];
};


export type MutationEditTrackingArgs = {
  order_id: Scalars['Float'];
  new_tracking_num: Scalars['String'];
};


export type MutationPaypalCheckoutArgs = {
  coupon: Scalars['String'];
  products: Scalars['String'];
};


export type MutationAddPaypalOrderArgs = {
  purchase_units: Scalars['String'];
  products: Scalars['String'];
  coupon: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationCheckoutArgs = {
  coupon: Scalars['String'];
  billing_info: Scalars['String'];
  shipping_info: Scalars['String'];
  products: Scalars['String'];
  user_id: Scalars['String'];
  token: Scalars['String'];
};


export type MutationToggleProductDisplayArgs = {
  product_id: Scalars['Float'];
};


export type MutationAddProductArgs = {
  stock: Scalars['Float'];
  price: Scalars['Float'];
  desc: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  product_id: Scalars['Float'];
};


export type MutationUpdateProductArgs = {
  stock: Scalars['Float'];
  price: Scalars['Float'];
  desc: Scalars['String'];
  product_id: Scalars['Float'];
  name: Scalars['String'];
};


export type MutationAddImgToProductArgs = {
  product_id: Scalars['Float'];
  img_url: Scalars['String'];
};


export type MutationRemoveImgFromProductArgs = {
  img_id: Scalars['Float'];
};


export type MutationApiLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationDeleteApiUserArgs = {
  uuid: Scalars['Float'];
};


export type MutationAddApiUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRemoveWarningArgs = {
  order_id: Scalars['Float'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationAddCouponArgs = {
  discount: Scalars['String'];
  coupon_name: Scalars['String'];
};


export type MutationDeleteCouponArgs = {
  coupon_name: Scalars['String'];
};


export type MutationValidateCouponArgs = {
  coupon_name: Scalars['String'];
};


export type MutationAddAnnouncementArgs = {
  text: Scalars['String'];
};


export type MutationDeleteAnnouncementArgs = {
  id: Scalars['String'];
};


export type MutationMaintenanceLoginArgs = {
  password: Scalars['String'];
  access_id: Scalars['String'];
};


export type MutationUpdateSocialUrlArgs = {
  id: Scalars['Float'];
  url: Scalars['String'];
};


export type MutationToggleSocialDisplayArgs = {
  id: Scalars['Float'];
};


export type MutationAddSectionArgs = {
  thumbnail: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteSectionArgs = {
  section_id: Scalars['Float'];
};


export type MutationAddProductToSectionArgs = {
  section_id: Scalars['Float'];
  product_id: Scalars['Float'];
};


export type MutationRemoveProductFromSectionArgs = {
  section_id: Scalars['Float'];
  product_id: Scalars['Float'];
};


export type MutationUpdateSectionArgs = {
  section_id: Scalars['Float'];
  thumbnail: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAddOptionToProductArgs = {
  product_id: Scalars['Float'];
  options_str: Scalars['String'];
};


export type MutationDeleteOptionsArgs = {
  options_str: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type AddPaypalOrderMutationVariables = Exact<{
  user_id: Scalars['String'];
  coupon: Scalars['String'];
  products: Scalars['String'];
  purchase_units: Scalars['String'];
}>;


export type AddPaypalOrderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addPaypalOrder'>
);

export type CheckoutMutationVariables = Exact<{
  token: Scalars['String'];
  user_id: Scalars['String'];
  products: Scalars['String'];
  shipping_info: Scalars['String'];
  billing_info: Scalars['String'];
  coupon: Scalars['String'];
}>;


export type CheckoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'checkout'>
);

export type GetAnnouncementsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAnnouncementsQuery = (
  { __typename?: 'Query' }
  & { getAnnouncements: Array<(
    { __typename?: 'Announcements' }
    & Pick<Announcements, 'id' | 'text'>
  )> }
);

export type GetCurrUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrUserQuery = (
  { __typename?: 'Query' }
  & { getCurrUser: (
    { __typename?: 'Users' }
    & Pick<Users, 'email' | 'uuid' | 'user_id'>
  ) }
);

export type GetMaintenanceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMaintenanceQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getMaintenance'>
);

export type GetProductQueryVariables = Exact<{
  product_id: Scalars['Float'];
}>;


export type GetProductQuery = (
  { __typename?: 'Query' }
  & { getProduct: (
    { __typename?: 'ProductsWithImages' }
    & Pick<ProductsWithImages, 'product_id' | 'name' | 'desc' | 'price' | 'stock' | 'org_stock' | 'exp_date'>
    & { images?: Maybe<Array<(
      { __typename?: 'Images' }
      & Pick<Images, 'img_id' | 'img_url'>
    )>> }
  ) }
);

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = (
  { __typename?: 'Query' }
  & { getProducts: Array<(
    { __typename?: 'ProductsWithImages' }
    & Pick<ProductsWithImages, 'product_id' | 'name' | 'desc' | 'price' | 'stock' | 'org_stock' | 'exp_date'>
    & { images?: Maybe<Array<(
      { __typename?: 'Images' }
      & Pick<Images, 'img_id' | 'img_url'>
    )>> }
  )> }
);

export type GetProductsOptionsQueryVariables = Exact<{
  product_id: Scalars['Float'];
}>;


export type GetProductsOptionsQuery = (
  { __typename?: 'Query' }
  & { getProductsOptions: Array<(
    { __typename?: 'Options' }
    & Pick<Options, 'option_id' | 'name' | 'price' | 'stock' | 'index'>
  )> }
);

export type GetSectionByIdQueryVariables = Exact<{
  section_id: Scalars['Float'];
}>;


export type GetSectionByIdQuery = (
  { __typename?: 'Query' }
  & { getSectionById: (
    { __typename?: 'Sections' }
    & Pick<Sections, 'section_id' | 'thumbnail' | 'name'>
  ) }
);

export type GetSectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSectionsQuery = (
  { __typename?: 'Query' }
  & { getSections: Array<(
    { __typename?: 'Sections' }
    & Pick<Sections, 'section_id' | 'name' | 'thumbnail'>
  )> }
);

export type GetSectionsProductsQueryVariables = Exact<{
  section_id: Scalars['Float'];
}>;


export type GetSectionsProductsQuery = (
  { __typename?: 'Query' }
  & { getSectionsProducts: Array<(
    { __typename?: 'ProductsWithImages' }
    & Pick<ProductsWithImages, 'product_id' | 'name' | 'desc' | 'price' | 'stock' | 'org_stock'>
    & { images?: Maybe<Array<(
      { __typename?: 'Images' }
      & Pick<Images, 'img_id' | 'img_url' | 'index'>
    )>> }
  )> }
);

export type GetSocialsQueryVariables = Exact<{
  component: Scalars['String'];
}>;


export type GetSocialsQuery = (
  { __typename?: 'Query' }
  & { getSocials: Array<(
    { __typename?: 'Socials' }
    & Pick<Socials, 'id' | 'index' | 'social_url' | 'social_logo' | 'display'>
  )> }
);

export type GetUsersOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersOrdersQuery = (
  { __typename?: 'Query' }
  & { getUsersOrders: Array<(
    { __typename?: 'GetOrdersResponse' }
    & Pick<GetOrdersResponse, 'order_id' | 'tracking_num' | 'order_total' | 'coupon' | 'discount' | 'shipping' | 'date_of_purchase'>
    & { products?: Maybe<Array<(
      { __typename?: 'OrdersProductsWithImages' }
      & Pick<OrdersProductsWithImages, 'product_id' | 'name' | 'desc' | 'price' | 'stock' | 'exp_date' | 'quantityOrdered' | 'productSubtotal'>
      & { images?: Maybe<Array<(
        { __typename?: 'Images' }
        & Pick<Images, 'img_id' | 'img_url' | 'index'>
      )>> }
    )>> }
  )> }
);

export type LoginMutationVariables = Exact<{
  user_id: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'accessToken' | 'refreshToken'>
  ) }
);

export type MaintenanceLoginMutationVariables = Exact<{
  access_id: Scalars['String'];
  password: Scalars['String'];
}>;


export type MaintenanceLoginMutation = (
  { __typename?: 'Mutation' }
  & { maintenanceLogin: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'refreshToken' | 'accessToken'>
  ) }
);

export type PaypalCheckoutMutationVariables = Exact<{
  products: Scalars['String'];
  coupon: Scalars['String'];
}>;


export type PaypalCheckoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'paypalCheckout'>
);

export type ValidateCouponMutationVariables = Exact<{
  coupon_name: Scalars['String'];
}>;


export type ValidateCouponMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'validateCoupon'>
);


export const AddPaypalOrderDocument = gql`
    mutation addPaypalOrder($user_id: String!, $coupon: String!, $products: String!, $purchase_units: String!) {
  addPaypalOrder(
    user_id: $user_id
    coupon: $coupon
    products: $products
    purchase_units: $purchase_units
  )
}
    `;
export type AddPaypalOrderMutationFn = Apollo.MutationFunction<AddPaypalOrderMutation, AddPaypalOrderMutationVariables>;

/**
 * __useAddPaypalOrderMutation__
 *
 * To run a mutation, you first call `useAddPaypalOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPaypalOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPaypalOrderMutation, { data, loading, error }] = useAddPaypalOrderMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      coupon: // value for 'coupon'
 *      products: // value for 'products'
 *      purchase_units: // value for 'purchase_units'
 *   },
 * });
 */
export function useAddPaypalOrderMutation(baseOptions?: Apollo.MutationHookOptions<AddPaypalOrderMutation, AddPaypalOrderMutationVariables>) {
        return Apollo.useMutation<AddPaypalOrderMutation, AddPaypalOrderMutationVariables>(AddPaypalOrderDocument, baseOptions);
      }
export type AddPaypalOrderMutationHookResult = ReturnType<typeof useAddPaypalOrderMutation>;
export type AddPaypalOrderMutationResult = Apollo.MutationResult<AddPaypalOrderMutation>;
export type AddPaypalOrderMutationOptions = Apollo.BaseMutationOptions<AddPaypalOrderMutation, AddPaypalOrderMutationVariables>;
export const CheckoutDocument = gql`
    mutation checkout($token: String!, $user_id: String!, $products: String!, $shipping_info: String!, $billing_info: String!, $coupon: String!) {
  checkout(
    token: $token
    user_id: $user_id
    products: $products
    shipping_info: $shipping_info
    billing_info: $billing_info
    coupon: $coupon
  )
}
    `;
export type CheckoutMutationFn = Apollo.MutationFunction<CheckoutMutation, CheckoutMutationVariables>;

/**
 * __useCheckoutMutation__
 *
 * To run a mutation, you first call `useCheckoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkoutMutation, { data, loading, error }] = useCheckoutMutation({
 *   variables: {
 *      token: // value for 'token'
 *      user_id: // value for 'user_id'
 *      products: // value for 'products'
 *      shipping_info: // value for 'shipping_info'
 *      billing_info: // value for 'billing_info'
 *      coupon: // value for 'coupon'
 *   },
 * });
 */
export function useCheckoutMutation(baseOptions?: Apollo.MutationHookOptions<CheckoutMutation, CheckoutMutationVariables>) {
        return Apollo.useMutation<CheckoutMutation, CheckoutMutationVariables>(CheckoutDocument, baseOptions);
      }
export type CheckoutMutationHookResult = ReturnType<typeof useCheckoutMutation>;
export type CheckoutMutationResult = Apollo.MutationResult<CheckoutMutation>;
export type CheckoutMutationOptions = Apollo.BaseMutationOptions<CheckoutMutation, CheckoutMutationVariables>;
export const GetAnnouncementsDocument = gql`
    query getAnnouncements {
  getAnnouncements {
    id
    text
  }
}
    `;

/**
 * __useGetAnnouncementsQuery__
 *
 * To run a query within a React component, call `useGetAnnouncementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnnouncementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnnouncementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAnnouncementsQuery(baseOptions?: Apollo.QueryHookOptions<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>) {
        return Apollo.useQuery<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>(GetAnnouncementsDocument, baseOptions);
      }
export function useGetAnnouncementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>) {
          return Apollo.useLazyQuery<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>(GetAnnouncementsDocument, baseOptions);
        }
export type GetAnnouncementsQueryHookResult = ReturnType<typeof useGetAnnouncementsQuery>;
export type GetAnnouncementsLazyQueryHookResult = ReturnType<typeof useGetAnnouncementsLazyQuery>;
export type GetAnnouncementsQueryResult = Apollo.QueryResult<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>;
export const GetCurrUserDocument = gql`
    query getCurrUser {
  getCurrUser {
    email
    uuid
    user_id
  }
}
    `;

/**
 * __useGetCurrUserQuery__
 *
 * To run a query within a React component, call `useGetCurrUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrUserQuery, GetCurrUserQueryVariables>) {
        return Apollo.useQuery<GetCurrUserQuery, GetCurrUserQueryVariables>(GetCurrUserDocument, baseOptions);
      }
export function useGetCurrUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrUserQuery, GetCurrUserQueryVariables>) {
          return Apollo.useLazyQuery<GetCurrUserQuery, GetCurrUserQueryVariables>(GetCurrUserDocument, baseOptions);
        }
export type GetCurrUserQueryHookResult = ReturnType<typeof useGetCurrUserQuery>;
export type GetCurrUserLazyQueryHookResult = ReturnType<typeof useGetCurrUserLazyQuery>;
export type GetCurrUserQueryResult = Apollo.QueryResult<GetCurrUserQuery, GetCurrUserQueryVariables>;
export const GetMaintenanceDocument = gql`
    query getMaintenance {
  getMaintenance
}
    `;

/**
 * __useGetMaintenanceQuery__
 *
 * To run a query within a React component, call `useGetMaintenanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaintenanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaintenanceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMaintenanceQuery(baseOptions?: Apollo.QueryHookOptions<GetMaintenanceQuery, GetMaintenanceQueryVariables>) {
        return Apollo.useQuery<GetMaintenanceQuery, GetMaintenanceQueryVariables>(GetMaintenanceDocument, baseOptions);
      }
export function useGetMaintenanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaintenanceQuery, GetMaintenanceQueryVariables>) {
          return Apollo.useLazyQuery<GetMaintenanceQuery, GetMaintenanceQueryVariables>(GetMaintenanceDocument, baseOptions);
        }
export type GetMaintenanceQueryHookResult = ReturnType<typeof useGetMaintenanceQuery>;
export type GetMaintenanceLazyQueryHookResult = ReturnType<typeof useGetMaintenanceLazyQuery>;
export type GetMaintenanceQueryResult = Apollo.QueryResult<GetMaintenanceQuery, GetMaintenanceQueryVariables>;
export const GetProductDocument = gql`
    query getProduct($product_id: Float!) {
  getProduct(product_id: $product_id) {
    product_id
    name
    desc
    price
    stock
    org_stock
    exp_date
    images {
      img_id
      img_url
    }
  }
}
    `;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
        return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, baseOptions);
      }
export function useGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, baseOptions);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const GetProductsDocument = gql`
    query getProducts {
  getProducts {
    product_id
    name
    desc
    price
    stock
    org_stock
    exp_date
    images {
      img_id
      img_url
    }
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, baseOptions);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, baseOptions);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductsOptionsDocument = gql`
    query getProductsOptions($product_id: Float!) {
  getProductsOptions(product_id: $product_id) {
    option_id
    name
    price
    stock
    index
  }
}
    `;

/**
 * __useGetProductsOptionsQuery__
 *
 * To run a query within a React component, call `useGetProductsOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsOptionsQuery({
 *   variables: {
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useGetProductsOptionsQuery(baseOptions: Apollo.QueryHookOptions<GetProductsOptionsQuery, GetProductsOptionsQueryVariables>) {
        return Apollo.useQuery<GetProductsOptionsQuery, GetProductsOptionsQueryVariables>(GetProductsOptionsDocument, baseOptions);
      }
export function useGetProductsOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsOptionsQuery, GetProductsOptionsQueryVariables>) {
          return Apollo.useLazyQuery<GetProductsOptionsQuery, GetProductsOptionsQueryVariables>(GetProductsOptionsDocument, baseOptions);
        }
export type GetProductsOptionsQueryHookResult = ReturnType<typeof useGetProductsOptionsQuery>;
export type GetProductsOptionsLazyQueryHookResult = ReturnType<typeof useGetProductsOptionsLazyQuery>;
export type GetProductsOptionsQueryResult = Apollo.QueryResult<GetProductsOptionsQuery, GetProductsOptionsQueryVariables>;
export const GetSectionByIdDocument = gql`
    query getSectionById($section_id: Float!) {
  getSectionById(section_id: $section_id) {
    section_id
    thumbnail
    name
  }
}
    `;

/**
 * __useGetSectionByIdQuery__
 *
 * To run a query within a React component, call `useGetSectionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSectionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSectionByIdQuery({
 *   variables: {
 *      section_id: // value for 'section_id'
 *   },
 * });
 */
export function useGetSectionByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSectionByIdQuery, GetSectionByIdQueryVariables>) {
        return Apollo.useQuery<GetSectionByIdQuery, GetSectionByIdQueryVariables>(GetSectionByIdDocument, baseOptions);
      }
export function useGetSectionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSectionByIdQuery, GetSectionByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetSectionByIdQuery, GetSectionByIdQueryVariables>(GetSectionByIdDocument, baseOptions);
        }
export type GetSectionByIdQueryHookResult = ReturnType<typeof useGetSectionByIdQuery>;
export type GetSectionByIdLazyQueryHookResult = ReturnType<typeof useGetSectionByIdLazyQuery>;
export type GetSectionByIdQueryResult = Apollo.QueryResult<GetSectionByIdQuery, GetSectionByIdQueryVariables>;
export const GetSectionsDocument = gql`
    query getSections {
  getSections {
    section_id
    name
    thumbnail
  }
}
    `;

/**
 * __useGetSectionsQuery__
 *
 * To run a query within a React component, call `useGetSectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSectionsQuery(baseOptions?: Apollo.QueryHookOptions<GetSectionsQuery, GetSectionsQueryVariables>) {
        return Apollo.useQuery<GetSectionsQuery, GetSectionsQueryVariables>(GetSectionsDocument, baseOptions);
      }
export function useGetSectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSectionsQuery, GetSectionsQueryVariables>) {
          return Apollo.useLazyQuery<GetSectionsQuery, GetSectionsQueryVariables>(GetSectionsDocument, baseOptions);
        }
export type GetSectionsQueryHookResult = ReturnType<typeof useGetSectionsQuery>;
export type GetSectionsLazyQueryHookResult = ReturnType<typeof useGetSectionsLazyQuery>;
export type GetSectionsQueryResult = Apollo.QueryResult<GetSectionsQuery, GetSectionsQueryVariables>;
export const GetSectionsProductsDocument = gql`
    query getSectionsProducts($section_id: Float!) {
  getSectionsProducts(section_id: $section_id) {
    product_id
    name
    desc
    price
    stock
    org_stock
    images {
      img_id
      img_url
      index
    }
  }
}
    `;

/**
 * __useGetSectionsProductsQuery__
 *
 * To run a query within a React component, call `useGetSectionsProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSectionsProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSectionsProductsQuery({
 *   variables: {
 *      section_id: // value for 'section_id'
 *   },
 * });
 */
export function useGetSectionsProductsQuery(baseOptions: Apollo.QueryHookOptions<GetSectionsProductsQuery, GetSectionsProductsQueryVariables>) {
        return Apollo.useQuery<GetSectionsProductsQuery, GetSectionsProductsQueryVariables>(GetSectionsProductsDocument, baseOptions);
      }
export function useGetSectionsProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSectionsProductsQuery, GetSectionsProductsQueryVariables>) {
          return Apollo.useLazyQuery<GetSectionsProductsQuery, GetSectionsProductsQueryVariables>(GetSectionsProductsDocument, baseOptions);
        }
export type GetSectionsProductsQueryHookResult = ReturnType<typeof useGetSectionsProductsQuery>;
export type GetSectionsProductsLazyQueryHookResult = ReturnType<typeof useGetSectionsProductsLazyQuery>;
export type GetSectionsProductsQueryResult = Apollo.QueryResult<GetSectionsProductsQuery, GetSectionsProductsQueryVariables>;
export const GetSocialsDocument = gql`
    query getSocials($component: String!) {
  getSocials(component: $component) {
    id
    index
    social_url
    social_logo
    display
  }
}
    `;

/**
 * __useGetSocialsQuery__
 *
 * To run a query within a React component, call `useGetSocialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSocialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSocialsQuery({
 *   variables: {
 *      component: // value for 'component'
 *   },
 * });
 */
export function useGetSocialsQuery(baseOptions: Apollo.QueryHookOptions<GetSocialsQuery, GetSocialsQueryVariables>) {
        return Apollo.useQuery<GetSocialsQuery, GetSocialsQueryVariables>(GetSocialsDocument, baseOptions);
      }
export function useGetSocialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSocialsQuery, GetSocialsQueryVariables>) {
          return Apollo.useLazyQuery<GetSocialsQuery, GetSocialsQueryVariables>(GetSocialsDocument, baseOptions);
        }
export type GetSocialsQueryHookResult = ReturnType<typeof useGetSocialsQuery>;
export type GetSocialsLazyQueryHookResult = ReturnType<typeof useGetSocialsLazyQuery>;
export type GetSocialsQueryResult = Apollo.QueryResult<GetSocialsQuery, GetSocialsQueryVariables>;
export const GetUsersOrdersDocument = gql`
    query getUsersOrders {
  getUsersOrders {
    products {
      product_id
      name
      desc
      price
      stock
      exp_date
      quantityOrdered
      productSubtotal
      images {
        img_id
        img_url
        index
      }
    }
    order_id
    tracking_num
    order_total
    coupon
    discount
    shipping
    date_of_purchase
  }
}
    `;

/**
 * __useGetUsersOrdersQuery__
 *
 * To run a query within a React component, call `useGetUsersOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersOrdersQuery, GetUsersOrdersQueryVariables>) {
        return Apollo.useQuery<GetUsersOrdersQuery, GetUsersOrdersQueryVariables>(GetUsersOrdersDocument, baseOptions);
      }
export function useGetUsersOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersOrdersQuery, GetUsersOrdersQueryVariables>) {
          return Apollo.useLazyQuery<GetUsersOrdersQuery, GetUsersOrdersQueryVariables>(GetUsersOrdersDocument, baseOptions);
        }
export type GetUsersOrdersQueryHookResult = ReturnType<typeof useGetUsersOrdersQuery>;
export type GetUsersOrdersLazyQueryHookResult = ReturnType<typeof useGetUsersOrdersLazyQuery>;
export type GetUsersOrdersQueryResult = Apollo.QueryResult<GetUsersOrdersQuery, GetUsersOrdersQueryVariables>;
export const LoginDocument = gql`
    mutation login($user_id: String!, $email: String!) {
  login(user_id: $user_id, email: $email) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MaintenanceLoginDocument = gql`
    mutation maintenanceLogin($access_id: String!, $password: String!) {
  maintenanceLogin(access_id: $access_id, password: $password) {
    refreshToken
    accessToken
  }
}
    `;
export type MaintenanceLoginMutationFn = Apollo.MutationFunction<MaintenanceLoginMutation, MaintenanceLoginMutationVariables>;

/**
 * __useMaintenanceLoginMutation__
 *
 * To run a mutation, you first call `useMaintenanceLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMaintenanceLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [maintenanceLoginMutation, { data, loading, error }] = useMaintenanceLoginMutation({
 *   variables: {
 *      access_id: // value for 'access_id'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useMaintenanceLoginMutation(baseOptions?: Apollo.MutationHookOptions<MaintenanceLoginMutation, MaintenanceLoginMutationVariables>) {
        return Apollo.useMutation<MaintenanceLoginMutation, MaintenanceLoginMutationVariables>(MaintenanceLoginDocument, baseOptions);
      }
export type MaintenanceLoginMutationHookResult = ReturnType<typeof useMaintenanceLoginMutation>;
export type MaintenanceLoginMutationResult = Apollo.MutationResult<MaintenanceLoginMutation>;
export type MaintenanceLoginMutationOptions = Apollo.BaseMutationOptions<MaintenanceLoginMutation, MaintenanceLoginMutationVariables>;
export const PaypalCheckoutDocument = gql`
    mutation paypalCheckout($products: String!, $coupon: String!) {
  paypalCheckout(products: $products, coupon: $coupon)
}
    `;
export type PaypalCheckoutMutationFn = Apollo.MutationFunction<PaypalCheckoutMutation, PaypalCheckoutMutationVariables>;

/**
 * __usePaypalCheckoutMutation__
 *
 * To run a mutation, you first call `usePaypalCheckoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePaypalCheckoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [paypalCheckoutMutation, { data, loading, error }] = usePaypalCheckoutMutation({
 *   variables: {
 *      products: // value for 'products'
 *      coupon: // value for 'coupon'
 *   },
 * });
 */
export function usePaypalCheckoutMutation(baseOptions?: Apollo.MutationHookOptions<PaypalCheckoutMutation, PaypalCheckoutMutationVariables>) {
        return Apollo.useMutation<PaypalCheckoutMutation, PaypalCheckoutMutationVariables>(PaypalCheckoutDocument, baseOptions);
      }
export type PaypalCheckoutMutationHookResult = ReturnType<typeof usePaypalCheckoutMutation>;
export type PaypalCheckoutMutationResult = Apollo.MutationResult<PaypalCheckoutMutation>;
export type PaypalCheckoutMutationOptions = Apollo.BaseMutationOptions<PaypalCheckoutMutation, PaypalCheckoutMutationVariables>;
export const ValidateCouponDocument = gql`
    mutation validateCoupon($coupon_name: String!) {
  validateCoupon(coupon_name: $coupon_name)
}
    `;
export type ValidateCouponMutationFn = Apollo.MutationFunction<ValidateCouponMutation, ValidateCouponMutationVariables>;

/**
 * __useValidateCouponMutation__
 *
 * To run a mutation, you first call `useValidateCouponMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateCouponMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateCouponMutation, { data, loading, error }] = useValidateCouponMutation({
 *   variables: {
 *      coupon_name: // value for 'coupon_name'
 *   },
 * });
 */
export function useValidateCouponMutation(baseOptions?: Apollo.MutationHookOptions<ValidateCouponMutation, ValidateCouponMutationVariables>) {
        return Apollo.useMutation<ValidateCouponMutation, ValidateCouponMutationVariables>(ValidateCouponDocument, baseOptions);
      }
export type ValidateCouponMutationHookResult = ReturnType<typeof useValidateCouponMutation>;
export type ValidateCouponMutationResult = Apollo.MutationResult<ValidateCouponMutation>;
export type ValidateCouponMutationOptions = Apollo.BaseMutationOptions<ValidateCouponMutation, ValidateCouponMutationVariables>;