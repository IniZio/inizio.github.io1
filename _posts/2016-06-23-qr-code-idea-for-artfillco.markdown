---
title: QR code idea for Artfill.co
layout: default
Category: Development
tags: [codeigniter, artfill, QR_code]
---

<h2 class="text-xs-center">
	How it started
</h2>
<br />
<p>
	Lane Crawford site
</p>
<p>
	When I looked at Lane Crawford website, the Payment inspired me. It provides a very smooth flow of payment. Payment methods include Credit Card, 支付宝, Payment on Receive, shop credit. Payment on receive offers automatically sendin the product to your address.
</p>
<p>
	Now the payment flow is really nice, but obviously it cant be applied directly to Artfill, as the company size is so different, and we are Hong Kong local. However it can be a perfect model for learning. The idea starts here.
</p>

<h2 class="text-xs-center">
	QR Code
</h2>
<p>
	Lane Crawford will not use QR Code because they already got professional bar code scanners and digital management system. But our aim users don't. They can be anyone from Hand-made sellers to Any hand-made buyer. Since we use Codeigniter Framework, it already has mature libraries to generate QR code. Now thats the payment method.
</p>

<h2 class="text-xs-center">
	How QR code works for payment on receive
</h2>
<p>
	What is the best meeting site for payment and giving product? MTR stations. Now I simulated a payment flow using Payment on receive product. The buyer choose his desired MTR station with seller. Buyer outside the paid area of MTR station, Seller going to the that station in paid area. Buyer pay or already got the money paid to Artfill. The seller give the product to buyer. If the buyer havent already paid money, he gives it on site. Now both gave and got what they need to, then buyer give the order slip with QR code and transaction confirmation code. It can be physical or phone. The seller scans the QR code or get the invoice. If scan QR code it immediately confirms the trade, else if get the invoice Seller can input the order code and transaction confirmation code on the invoice. Tada~~ easy confirmation.
</p>

<h2 class="text-xs-center">Wait something more...</h2>
<p>
	No no... If thats just what my app do then just install a QR scanner la... Now a happy transcation done , the phone app recommend more related products to buyer, make a friend request between them, ,,, so many stuff to tell. Within some time after the transaction the app will notify the buyer of new products, status of seller. For seller, make the buyer one of the list of 'happy and smooth trade' buyers, and rank the seller up in reputation.
</p>

<h2 class="text-xs-center">Now the even bigger part, something amazing</h2>
<p>
	On 18-19/6 there was a JACC hand-made fair, where the whole building got transformed into a handmade marketplace. I walked into all shops, got namecards. There were so many kinds, from  small key rings, handmade raw materials, to simply stuff to demonstrate, and even successful brands. One thing though, they don't have any digital management system, no bar code scanners, some even don't have namecards. But the one thing I see is they love their hand-made artifects and want to share the beauty with others.
</p>

<h2 class="text-xs-center">Thats also the point I realised me or our mistakes of all along...</h2>
<p>We bought the platform from shopsy, and it was a commercial selling platform. Lots of tools premade, structure set. However hand-made artifect is not a commercial product. Well actually there is already a competitor against us, boutir.com. The flow of the website is smooth and clear, and is focused in mobile app, making it very convenient and attractive to buyer products from it. But I saw one mistake. There is no interaction between buyers and sellers, but payments, pictures. Well something is made by yourself, especially by hand for beauty, you want it to be demonstradted in the best way, and want to give a message that everyone can know. No just photos, but also videos, articles, thoughts, stuff that make the artifect even more perfect. It just is wrong to treat them like food and drinks on the shelf in supermarkets. Even the business of hand-made should be art. We had been thinking about making the payment smooth and stable, nothing else. But that should not have been the major part of the system. Sharing, demonstrating, giving meanings of hand-made artifects. They should be what our effort for. Make eveyone admire hand-mades, make everyone know the efforts behind.</p>

<h2 class="text-xs-center">Of course, its still business</h2>
<p>
	Well we are a startup business, and giving such business needs cost to cover. Imagine everyone use our system to pay, only payment ~5% commission to us. Thats the whole marketplace, the whole building. Thats not even the only one hand-made marketplace. Our boss thought hand-made artifects' market is small. Come on this is stupid. We not dreaming to becoming billionaires are we? It's an amazying community, and that's so enough already a market. 
</p>

<p>
	Make it something
</p>
<p>
	 What I said (wrote) is amazing (well at least to me...), but how? We currently using Codeigniter Framework, a few QR code generators are present to generate QR code from strings to png files. The scanner part though.. We have not even started planning the app. So I think it is ok if just make the app mainly a QR scanner first. Stuff to concern though is have the order invoice able to view even if offline. I mean you don't want to fail a trade because you can't download the invoice without network... One way is to automatically and notify user to allow downloading the invoice to a certain directory first, then get it in the order tab in app. Also an important function is to choose the location e.g. MTR station, as there is not even such thing in website version yet. Also you can fail to find each other even if in station, so maybe some 'hey he is near you in this direction' function?. This is an advanced and not that necassary yet.
</p>