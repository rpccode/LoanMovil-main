declare module 'react-native-swipeable-list' {
    import * as React from 'react';
    import { FlatListProps } from 'react-native';
  
    interface SwipeableFlatListProps<ItemT> extends FlatListProps<ItemT> {
      maxSwipeDistance?: number;
      renderQuickActions: (info: { index: number; item: ItemT }) => React.ReactNode;
      shouldBounceOnMount?: boolean;
    }
  
    export default class SwipeableFlatList<ItemT> extends React.Component<SwipeableFlatListProps<ItemT>> {}
  }
  