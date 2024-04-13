export enum ResponseType {
    PURCHASE_PENDING = "قيد الإنتظار",
    PURCHASE_IN_DELIVERY = "التسليم قيد التقدم",
    PURCHASE_DELIVERED = "تم التوصيل",
    PURCHASE_CANCELLED = "تم الإلغاء",
    PURCHASE_RETURNED = "مرتجع",
    PURCHASE_OUT_OF_STOCK = "نفذت الكمية",
    RFQ_PENDING = "قيد الإنتظار المورد",
    RFQ_REPLY_PENDING = "قيد الإنتظار العميل",
    RFQ_APPROVED = "تم الموافقة",
    RFQ_REJECTED = "تم الإلغاء",
}