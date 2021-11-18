https://shop-90fe6.web.app/products

# 測試用的帳號密碼
> account : test1234@test.com
> 
> password : test1234

# **專案**
這專案是React實作簡易的購物網站，雖然不比真正的購物網站，不過還是有基本的呈現(RWD、SPA)。
後端用的是firebase的rest api來完成。

# **使用的技術**
hooks，使用useContext來完成auth，包括使用custom hook來處理ajax code以及createPortal來產生購買頁面等。
 
react-router，用來routing，幫助製作SPA。用flex、@media來製作RWD，讓畫面可以在其他裝置有一定程度的呈現。

# **中途遇到的問題**
一開始對RWD還沒有甚麼認識，所以也沒有特別注意，自己的成品難以在行動裝置上呈現。
後來才追加一些media query來完成。

完成專案後也更加認識的自己的不足。

# **可以改進的部分**
這個專案的資料並不太需要在component傳遞，所以只用props和useContext，未來如果有更大的專案，用Redux來應該比較好。

react-router現在也更新到v6，之後可能可以改一下。
