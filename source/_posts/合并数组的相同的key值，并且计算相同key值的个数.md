---
title: 合并数组的相同的key值，并且计算相同key值的个数
date: 2018-08-30 15:33:19
categories: "前端" 
tags: [js代码片段]
issues: 108
---

#### 需求：
合并数组的相同的key值，并且计算相同key值的个数
#### 场景：
根据list数组的每一项的key值coupon_sn合并数组，并且计数
#### js代码
##### json数组：
```json
let list = [{
	"id": 5899,
	"is_use": 0,
	"use_time": null,
	"expired_time": "2018-12-31 00:00:00",
	"coupon": {
		"coupon_sn": "1",
		"name": "满减",
		"type": 2,
		"count": 99993,
		"receive_count": 6,
		"is_fare": 0,
		"available_money": "2000.00",
		"reduce_money": "100.00",
		"discount": "1.000",
		"receive_start_time": "2018-07-27 00:00:00",
		"receive_end_time": "2020-12-31 00:00:00",
		"info": "",
		"created_at": "2018-07-27 21:22:51",
		"restriction_description": "仅限非板材使用"
	}
}, {
	"id": 5899,
	"is_use": 0,
	"use_time": null,
	"expired_time": "2018-12-31 00:00:00",
	"coupon": {
		"coupon_sn": "2",
		"name": "满减",
		"type": 2,
		"count": 99993,
		"receive_count": 6,
		"is_fare": 0,
		"available_money": "2000.00",
		"reduce_money": "100.00",
		"discount": "1.000",
		"receive_start_time": "2018-07-27 00:00:00",
		"receive_end_time": "2020-12-31 00:00:00",
		"info": "",
		"created_at": "2018-07-27 21:22:51",
		"restriction_description": "仅限非板材使用"
	}
}, {
	"id": 5899,
	"is_use": 0,
	"use_time": null,
	"expired_time": "2018-12-31 00:00:00",
	"coupon": {
		"coupon_sn": "2",
		"name": "满减",
		"type": 2,
		"count": 99993,
		"receive_count": 6,
		"is_fare": 0,
		"available_money": "2000.00",
		"reduce_money": "100.00",
		"discount": "1.000",
		"receive_start_time": "2018-07-27 00:00:00",
		"receive_end_time": "2020-12-31 00:00:00",
		"info": "",
		"created_at": "2018-07-27 21:22:51",
		"restriction_description": "仅限非板材使用"
	}
}]
```

##### js代码
```js
 let hash = {
	coupon: {},
}, i = 0, res = [];
list.forEach(function(item ) {
	let coupon_sn = item.coupon.coupon_sn;
	if (hash[coupon_sn]) {
		if (!res[hash[coupon_sn] - 1].count) {
			res[hash[coupon_sn] - 1].count = 1
		}
		res[hash[coupon_sn] - 1].count += 1
	} else {
		hash[coupon_sn] = ++i && res.push({
			"count": 1,
			"id": item.id,
			"is_use": item.is_use,
			"use_time": item.use_time,
			"expired_time": item.expired_time,
			"coupon": item.coupon
		})
	}
});
console.log(res);
```

