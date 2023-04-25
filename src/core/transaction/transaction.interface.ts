// interface, class 모두 어떤  모양인지 알려줄 수 있다.
// instanceof 등의 메서드는 interface로 검사를 할 수 없다.
// 따라서 검사를 하기 위해서는 class로 표현해줘야한다.
export class TransactionRow {}
export type TransactionData = string | TransactionRow