/**
 * 命名方式， 组件名+操作名+标识（成功/失败...）
 * 若有相同的命名方式，并且需要做区分标识，自行增加第四个状态参数，组件名+操作名+标识+场景（anchor/user...）
 * 非当前组件库组件, 暂时先忽略， 比如： component_panel2_1_pop2_close_event，
 */

export const LOTTERY_TRYAGAIN = 'lottery_tryagain';
export const LOTTERY_POP_TRYAGAIN = 'lottery_pop_tryagain';

// 2023-03-14 以后废弃以下事件，不要再使用了
// 2023-03-14 以后废弃以下事件，不要再使用了
// 2023-03-14 以后废弃以下事件，不要再使用了
// 2023-03-14 以后废弃以下事件，不要再使用了
// 2023-03-14 以后废弃以下事件，不要再使用了
// 2023-03-14 以后废弃以下事件，不要再使用了
// 2023-03-14 以后废弃以下事件，不要再使用了

// page_sign 组件
export const SIGN_REG_STATUS = 'sign_reg_status'; // 报名信息
export const SIGN_REG_SUCCESS = 'sign_reg_success'; // 报名成功

// page_list 组件
export const LIST_DAY_CHANGE = 'list_day_change'; // 日榜时间切换
// export const LIST_HOUR_CHANGE = 'list_hour_change'; // 小时榜时间切换
export const LIST_MINUTE_CHANGE = 'list_minute_change'; // 分钟榜时间切换

// 卡片组件
export const CARD_LOTTERY_SUCCESS = 'card_lottery_success'; // 抽卡-成功

export const LOTTERY_GET_SUCCESS = 'lottery_get_success';

// page_container 组件
export const CONTAINER_LAST_POP_GET_STATUS = 'container_last_pop_get_status'; // 获取底部弹窗显示/隐藏的状态
export const CONTAINER_LAST_POP_SET_STATUS = 'container_last_pop_set_status'; // 设置底部弹窗显示/隐藏的状态

export const TASK_HAND_REWARD_CLICK = 'task_hand_reward_click';
export const TASK_HAND_REWARD_RELOAD = 'task_hand_reward_reload';
export const TASK_LIST_RELOAD = 'task_list_reload';
export const TASK_GRADE_REWARD_RELOAD = 'task_grade_reward_reload';

export const LIST_POP_CLOSE_EVENT='list_panel_pop_close';