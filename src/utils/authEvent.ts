// 커스텀 이벤트 이름 정의
export const AUTH_EVENT_NAME = 'auth:unauthorized';

// 이벤트를 발생시키는 함수 (Axios에서 사용)
export const triggerAuthErrorEvent = () => {
    const event = new Event(AUTH_EVENT_NAME);
    window.dispatchEvent(event);
};