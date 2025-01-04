declare module "react-undraw-illustrations" {
  export interface UndrawProps {
    primaryColor?: string;
    height?: string | number;
    className?: string;
  }

  export const UndrawDeliveryTruck: React.FC<UndrawProps>;
  export const UndrawAnalytics: React.FC<UndrawProps>;
  export const UndrawNavigation: React.FC<UndrawProps>;
  export const UndrawInventory: React.FC<UndrawProps>;
  export const UndrawOnlineTransactions: React.FC<UndrawProps>;
}
