https://shop-90fe6.web.app/products

使用react-router-dom來製作的SPA

算是簡單模仿小購物網站，雖然很不美觀就是了。是以react hooks開發。

以firebase作為簡單的後端，幫忙存商品資料，Firebase Auth rest api來處理sign in/up。

useHttp是custom hook，用useReducer處理fetch、asycn/await的部分，依照response來dispatch action。

到首頁，useEffect會使用的上述的useHttp所提供的sendRequest來fetch商品資料。

商品就簡單地用flex呈現了，點選愛心則是加入願望清單。游標移到wish是顯示現在關注的商品的圖片。

登入頁面是用useRef來選取輸入的帳號密碼。

用useContext來存auth的idtoken等資訊，用localStorage存idtoken，重新整理時可以維持登入。wish並沒有存下來。

upload則是上傳商品的頁面，登入後才會顯示。

購買頁面沒有額外寫一個page來呈現，而是用ReactDOM.createPortal直接產生Modal來當作購買頁面。

而錯誤的網址則會到Not Found的頁面。

而此作品也就做到這了。

懶得sign up的話
測試的帳號密碼
test1234@test.com
test1234

