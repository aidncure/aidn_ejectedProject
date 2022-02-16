import React, { Component, useState, useEffect } from 'react';
import {View, Text, Button, SafeAreaView,StatusBar, ToastAndroid,StyleSheet,TouchableOpacity,TextInput,Image,Keyboard,TouchableWithoutFeedback,ScrollView} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { fetchUser, newUser, } from "../../apiServices";
// import firebase from '../../firebase';
import {firebase, auth, db, firestore} from '../../firebase';
import RazorpayCheckout from 'react-native-razorpay';
import axios from "axios";


const Generate = ({navigation}) => {

   const [users, setUsers] = useState([]);
   const [orderId, setOrderId] = useState();

    useEffect(() => {
    // This will generate the Order Id
    axios({
      method: "POST",
      url: "https://api.razorpay.com/v1/orders",
      headers: {
        "content-type": "application/json",
        // Authorization: "Basic cnpwX3Rlc3RfNlJ0WDNBb3FhT1FUcEE6U3FBaWs0TkhIUWNZNjFHRjBWUmZjSWtJ" // Generate your Auth code by using key id and key secret in postman
        Authorization: "Basic cnpwX2xpdmVfeWdsbUxSWTltRGE1VWs6NmlXSElaTExyUUlWbkVUejZrOEtmZHpE" // Generate your Auth code by using key id and key secret in postman
      },
      data: JSON.stringify({
        amount: 100,
        currency: "INR",
        receipt: "receipt81",
        payment_capture: 1
      })
    })
      .then(res => {
        console.log(res);
        setOrderId({
          orderId: res.data.id // Extracting the OrderId from razorpay response data
        });
      })
      .catch(err => {
        console.log("Theres an error with the code", err);
      }); 

    }, [])

    const [state , setState] = useState({
        Codename:'',
        Codegender:'',
        Codeage:'',
        fullAddress:'',
        Codefrom:'',
        Codeblood:'',
        Codeemergency:'',
        Codeuid:' ', 
        Codephone:'',     
    });
    const handleChangeText = (Codename, value) =>{
        setState({...state, [Codename]:value})
    }
    // const appointment = firebase.firestore().collection('users');
    const userData = firebase.auth().currentUser;
    const db = firebase.firestore()
    const saveUsers = async () => {
        if (state.Codename === ''){
            ToastAndroid.show('Please fill the details',
            ToastAndroid.LONG
            )
        }else{
           await db.collection('UserQR').doc('Purchased QR'+ userData.uid).set({
                Codename : state.Codename,
                Codegender: state.Codegender,
                Codeage: state.Codeage,
                fullAddress: state.fullAddress,
                Codefrom: state.Codefrom,
                Codeblood:state.Codeblood,
                Codeemergency:state.Codeemergency,
                Codephone:state.Codephone,
                Codeuid:userData.uid,
            })
                const userDetails = firebase.auth().currentUser
                const userCurrentInfo = firebase.firestore()
                var options = {
                description: 'Aidn Pulse QR purchase',
                image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAACXBIWXMAAC4jAAAuIwF4pT92AAAwnElEQVR42u3dB1hVV7738UnuzCR3Wmbu9Lw3ZcqdnknTxA6KYsFeYzf2ighKE+zYe4ktdo3Gij12jb33htgQBOkdpJ13/Q9nKzoGgb1PAb6f59mPMwZO2Xu7fmutvcr3vgcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjispOe2Ni1fuVNx78Hzj7btOtTl8/Irr7bsP/5aVlf1Dzg4AAA7uwuU7FYeNWzG/UdsRd6rW9cr6xGWgqWKtgaZPa3uYnNy8U9t1n3B2/pIdftExib/jbP2n7Oyc74c/jH373v2oP0VFxb8ZG5f865SU9J+kpWX+SB0/fv6Ii0/5lfxM1KOENx+ER7+bnJL+M84iAEBXi3z0pK9mVq4zKOuTWu6mGg2GmGo19jW5NPEz1W7qZ/6zZiMfkwp508fOA0x1WwREbdh6tAtn7ql7YY/+9HnfqXvVuYp2aewXp87Rwwath91v3G7ErabtR95UR0iBQ/7/Tbc2w+6qn7lXr0VAeJ2m/o/qtwq8u2P36RacTQBAsT2IiHm3XY8JxyWotQCXMJcAf/6Qv1fBI61104dO/XMmzVw/gTOYb9jYFXP/XbWPOofq3DX0Np8jJ7chqnI02FS9/osP+e/5h7c6tz7m3pB23Scc5WwCAIolPiHll226jjsrXeuuzfxfGOLfGezN/Ewf1uiXO+2LTWM4k9/7Xuc+kw9XUyFtDnQ5R5bzVLTDx+Si/pSekZadgy6kpWf+N2cUAFBkfqOWLK6gWuZ1ihHmBQ9pzVeo6Z615+D5JuX5PObk5v5X2+7jT1et5/WdvRtFqSRJhUAF+sX0jMevcXcCAIrk0NHLdVXLPE9CuSQBJIe0RiXEPus67nRG5uNy26rMy8t7pUPPSSeq1vU0ItAvqUB/nTsUAFAk7j5zN8nodW3AW0kPqRBUrOmevXPP6Zbl+Xx2d5++p7Kr55Mudx2BflkFOl3uAICXCwuP/oMKnng9Qf60le5nkmfwviMWLyfQCXQAgA3t2n+2mYyo1tPdXjCIZMR2q85BFzMyy29XsQr0vQQ6AMCmlq3e616hprtBge5jcm7oLaPkIx9Gxr1VXs9ptwHT91Uh0AEAtjRn4dZAowJdDgn02k38Yu4/iP5jeT2nPT1m7qrsOohABwDYzpJVuwcZ1kLXAr2pX3R4RMy75fWcuvvM21TJPMiQQAcA2MjOvWdaVqzlbtwz9AaDTU3bj7qZkprx0/Ib6HMJdACAbd2+G/k31apONWqUu0x/8/Cbv7E8n1MDA/0KgQ4AKLLenrN2V65T8me+Beehf+w8IHf95iNd5XVzcnJfJdAJdACAjXyz90zLCjXdda0UV8u8/vhgU5N2I28mJqX+opy30IMJdACA3VqVMh+9pGu5q9/L+9hpgGnTtmOd5fVyc3NfIdAJdACAjUVGxf1v47YjQqXrvTihLiPbXZv553xYo79p1KSvZnMmjQv0Vp2DLmewljsAoLhuhob/S0aoV7RMY6vdxM+8WMx3hY7WRf9B9X6mwKDlC3Nycv+Ls2hMoMv2qU3ajQxNSUn/GWcUAFBs0TGJv/MevmilrMn+qYuHyamhtzmYzAFvObT9umX+upObd8rilbu8cvPyXuHsGRvobq2HhSUlpf2cMwoAKLGjJ6+5eAUs/Lpui6FREk4Vag4wyX7pEuJVXD1zpPU4btraaXfuRf6Fs/Ufgb7ZiEBv2Gb4vaTktDc4owAAI1rsvz926lrt4O3Huny1/mC/bd+cbH/uYmiVZLqCCXQAKO2ys3O+H5+Q/KuwB9F/unYz7IPzl25XluPC5duV5Dl0xMPYd5JVQZynsxs6ITHll+r13gu98/Af8poSrjGxib+TaWHy+nIkJaW9of7uN3KEP4x5R5ZcfRAe84f0jMc/4krZx0DfeZZA99Mb6PcJdAAwULgK0z0HzzedtWDLSK+hC9a16zHhtBS2qvBNqV5/8OOqdb1ytUMVxJm1m/jGS5d0l75TjgQGLVu8bPWeQWcv3KqWmpb5k6K+5/rNR7q5Nh8aq14v28nN+7FLE5/kei0DY+u3DIxu3HZkWNP2o+6o43aTdqPuqL97qI6IWo19ElzU4dzIO+WzbuPP3r0f9X9cvZeTipd2GPF6fb1m79KzUI+jBnpKavrP1D31l9PnQmrs3n+u+YatRz5f8fW+AUu/2jNIjuVr9rmv33Kk6679Z1ucOR9S/b6q8GYw7Q6AIxTy126EfTB8/Ir5tZv4xX1Sa6D5+bEsbVq1npephtsQk3OBAlg78ncc8zGvaS5baGq/V9l1UE7zjqNDxk37eubFK3crvqxl7trMP7ZKXc+nr6kOJ/WecshrFzwsf5/nbPm52k39ct+r2sc058utAfJ6OTm55X7AWlZW9g/uhT3684Ejl9wkfMZOXTNzcMDC9T09Zu7v2GvSqQ49J55Wx6nOfacc9VJ/P31ucNDGrUe7nL8YWrm4C+V0GzD9sN7tUwsE+s/tdf8/iIh5d8fu060nzVw/ubfnrD1N24+8U7OhT2plV8+sirUG5spiRHJvP3+o/5Yn4yxUBTO5RacxN4OmrJlz6txNp7S0zB9TsgCwGSlAN2w58nmPgTP2Vas/OOsTFw9tS1AJyjwX81Sup+FdWKEso8Etv2cu3FVr3lShlrtJBXWeu8/cLWdUq11734ILsVy5fq+C+tmc5wNBppDlH77PHT656shRP5NrWYI1TyoS077YFGQJ9HK5BGtsXPJvdu0702LMpNVz2nWfcFadmyQZva8Fj4zil21Oq6qKk3ZIJepT8yBA9ycDACVYPfzmB6/d9G3P6OjE37/sfbu7Tz9c2YBAd2szLMzWgS6VnmWr9w7s5TFzd60mvvGycY+5QlpnkPn+LTBlMa/gzIfnD+3fh/yO3Ivq97OlQqvCfba08LNzcr5PaQPAKuLik3+9YOlOX+kqt7Son5lrbcShvZ4U9BIaqpDLCQxaviwyKv4tSyvSHLyqNeMsLbyXVRoKW1NdvoNqZY7RG+hS0XjR8V0/a+/r+Dgr+4eHj12p6z966fL6LQMjZfU7CSXpVZGeE5cmBabfNcm/FgUrRwUrYVowSbh+ahnpX7f50GjVup9z517k36wd6KoiYZNAz8nN/a8jJ67WGRywcK1Uej52HmAOcEtvz5N7tiT3Y8F7XsJdroWEe5e+U45t3nG8E2M9ABgmMzPr9VXrDvSVwlMKMilItQLIqCD/rp3J5JBFXFRIxG3bdaqd9plOnLlR04hAVy30sZZAL/KCL3mldD65PN/9etOhnu17TDwrLW9pFTq5ef9Hi7GkAatVBJzVa8q5dW7onT51zsbJ8Ykpv7Kc41cKBPoRfYGe/3hFVUiiYuOSfmPN83b4+JW66vMekHMmh3b/WOP+Lxju0hNSwdnd1ObzsZe27z7VhkWJAOhy+lxI9Q49J54sGOR6Cv6Shq8U3tL6Gz5uxZcSqNIVbx5U1dg3z1aBfvHKnU8G+s7bolpOJ3sOnLF/gPfc7R5+8zf7jliyxm/kktXqWGM5vpbD03/BFvXz2+Xo5THzYI+BM771H7V0pQyasmmL/HHWa+uCD3dv1mH0LbmOVet65YdvIavcGXHN5E+Zl9+43ch7+w5daPpcC/2o7kBv6G1yVRW9yEfx/88a5y30zsO/D/Kfv1EeQchnrW2pYNrqvnexhHu1el7me7/XoFm7ZcYIpRKAYpGRt1O/2BRUSYWmtBTq2CHIX9RykfXQVTjuW7vp2z5SwdATOMUJ9NzcvFfbdp9w/v3q/cwFrDxukC5mOaSl+6LD3KKz/Iz5ObT6vX9W7m1SFYFttrqOJ8/ccO7Ya5K5QibdubaukNVp6q91I+fKs+HUtIyfyufqNmDa0Sq6W+je0nMTG/UowdBAz83NfVWekavXT5NraIveqJff+/4m+bcoY1YWr9ztKfcjpRSAl5KpXDKS+SMVAlKQ2bMwe1EQSwVDhXmWi45gekGgF1pAyjN81RpMzO9a1g6/Jy3dFx0uzxy+lp4Gb1OrLkHXrD1VKTkl/Y3x09ZOlbneEpz2rJBplTGpVKjKxQl1f/21j+fsfZV0TVsrGOjGtdBlDYOBvvM2feTU/5meBkc4zL0D6nvLZ/Pwm7cxNi7pt5RWAL6TDPyp08w/vrg7itm2YPM1pGJgCfRxRQn0iMi4d9T5SJHR/CXtpn6yQ1iXoOvW3CHs0tU7FVt/Pvbix+YKmZ/DVMjqNPMzSQXDrfWwh43bjQzT08NSINDjjAp06c5u1n5UqLZFbi0HvPe1Xg/5jC06jbkeEhr+L0otAP8hePuxjirIc7Vn5TUdtEAzqqVfnEB/GBn3toGBfs1agS57rVevPzhLnpM7YoVMKhgSxHKPyVRCRwn0k2du1FQVn5SqlsdLjn7/SqhLT5Vr86Ex5y6FVqH0AvDEmg0He0mtXxuMU5bD3EFa6IZ3uc9euGX4xzUHPO2eddBzb1kXQOdrPAn0eL2BfvzUdRdVwcip0WBwqarIymeV8Qnqnkw6e+FWVUoxAN9bF3y4m8x9LcpiMGUw0MfboYVueKCPm/b1NHm2WtvOgxdtVyl4EugJegL98rV7FdX5SpceA0euBBXW4yGh7tpsaMyNWw/+TWkGlGO79p1tIaOwy1OYP7uwTFFb6LHv1GlqCfRGjhXoQVPWzJQwd9QxDzYI9P8tyXmLjIp7q3HbkQ9k9kFpfsSkDRRt3nH0DdmciFINKIdk57MabkOy8lud5SfMtUJQeiVk3Xg5Fy9bwU1Co26LoQkSIga00G8YFehTZm+YYA7zpv7l6voVCPTEkgS6TFPs4zV7j8wxr1MGxovItDb5Lv29v9jOAjRAObNl54n2Lk380qwR5trUrvxNWLzNm7RUbzDE3DUoG6WYN21Rf6+NWHcx4JlqyQJ9oGnM5NVzixLocQkpv27YZnhU/mAuX52BPlZ3oMsuXe4+c7flLxLja/XwfH5zndIc6I+iE97sO3jObhkAZ81u9hfvKWC9cyjfRe4H9d12Gj03H4CD2rTtWCfpbjZ2Dfb8DU8kqGUxDnl9J7chmc07jrnb3X36t55DF2zyH7105SD/+Zu7D5h+uHnH0XedGnpnyc8VXILUVoGhtdCLHOjxyYYFesvOQTf1rM/9MCruLbc2w8KlcmTN5UdrW8JOG5UuFTL5U66xtsyr/ea2Pwn0pOIEuqwy2HvQLMsceD+rnTu5LrK6oXSFV6pdcIEhT3OltuDPGR3qMuW064Bp+7Kz2dwFKNMiVeHXoFVghLSSjSqM8wsvb/Myn6pASfAevmh18PZjnW/djvhnWvqLt4NMS8v8ye27D/++9ZuTHYaOWba8XouAmAoFlpcts4Fez8vUttv4S48fZ79W0msoG4RIJcjo81TbMmddWnn5W3y6mxfwqdsiQPauD2vWYdTdRp8Nj6jT1D+xUu1BudLDISHvYuMlUfUE+rZvTraT72X0uatVcJlW2bjFdVC2W+thEZ36TD45wHvuVlWhXT/Qd15w1/7TjjRpN+petXqDs+TntNXyjKwYWcaH5H296duelHhAGaYCbLaRrXOt1Sk7bM35cuuwiIex75Tkc0XHJv5u2eq9Hio47srn03b1crBAj9QT6PJ9pMXWuc/kU7K8aEnOk6ooGd67ogWKPIOtVMcjt2338ecmzVw/6Zu9Z1peDwl7Pzom4fdJyak/T05J/5nse/4wMvbtg0cuuY2e+NXcFh1Hh5h/T7U+bbmqYIFATy5qoMsucx16Tjqb39VubIDKv4GKNd1zPus67ty8xdv9z164VSU+IeWXz19n6SGQ83jtRtgHK77e595twLRDquWe42R5BGXUv0npBVAVsBvF3aceQClx+dq9j2XREaOeV2st8/Y9J55+fupQSbcjla0wZ87fPFq1EnOq1bfevGB7BLr8noRJp96TTpdk4JJ8hkZtR9zT8xle8Jgkf43wel6ZfiOXrDxx+npN2cylqJ8pNS3jJwcOX2zk4TcvWLp6q7gOskkPS0kCffuuU20rGtyzIb0allXbrm7bdeqzzGKcu/z7Lu/VI8ev1m3QKvBRfsXK2FkcUkmm5APKIF9VYEtryogCTeteVIVQjOxKZQlxw7YVPXsxtIq01iVsrBEQ9g30yWdKEugz5gWPkW5aI86H1kKVQr+P1+wdl6/eraD3mp0+d7PG5/2mHtF6WKz5fL0kgd570Kz9lXWsH/+iHhf1XXNHTlg1T7am1XPuZHEbbWtWYypr8njHPKPi0nc99gJQSt0IefBvJ7chGbUMapVI13HjdiNv37gV/p61PrOMRu6iAkIGE1njebF5lPsk2z5DL2mg33/w6M/qHCTqmQf/zGIkDQZLN3HGyrX7+2s7d0mFLDsnR1elLCs75wcLl+30VcGZJYFrrS744gb6xSt3PpUKqJHjRj5x8chetGLXEKPud/PSy66e2ebR8cbd4zny6IQSEChDJs1aP8mIZ69SkEnBqFrPoTJ1ytJt+Iq1Prc8b1StvsOVahvbUte6JCfP2jDFHGYveaatAv039gz0aXM3jTPm+vmZt3Gt22Jo1KlzN520xyM5OTmGbsd56MglN/V+qTWsNhK/YKAnvDTQZ8wLHmvU2APt3pm7eHuAnsdLL7Jm46GeKoRzjRhkKK8hleFB/gs2UgICZURiYur/NDbg2av8rmV6Wdz1m2HvWwozqy9iIXNqm7YfddvSxW/wSnHBRVopzp6BHhuf/GuZpqb3+pkrY/UHmxq0DnygLROanZ1ttalN5y+FVnFp7JviZOCMimcCvaG3bE6SEvko/q3CPofMKGjbffylqga00OW+kcdWQ4YtWl2Unp2SCJqyZoZRI/GlR0e9TsyDhzHvUhICZcCufWdbmqc5NdHfupPnfDt2n25jdMvkZU6dvVlDBXqWUcFQYC33CXYI9GINilsXfLiH3talvLd5MZ/GPkmXrt75xNphrjl8/Eo9FaSZ1mmhDzHVbxUYL9emsM9w6erdikZ0t8vv18h/z7CIyNi3rVYBT0r9hWyNKlMCjaiAyBS2jVuOfk5JCJQBAUHLl+kNdFk0Rp45BwYtX2Rpmbxq6+9hHhRmcLdpaQj0Pp6zd+sdzCWVMdWyzJF52PKaWTYIc83yNfsGGr+Qka95zQJ1TaJlZkTh77/Xo0JN/YMJtXtGfR93a1dog7cf76ha6blGPGKRHgWZwUBJCJRyySnpbzTrMCpUT22/QPfmo7Dw6D/K68p8Wlt/F5nX26TdyDsGtlwKbs7yskFxdgn023cj/+bc0CfNiBH9IyesnJ/fMs+x+VrfA7y/2CbjIIxagEYLdLc2w14a6L4jFq+WUNPz3trc7qbtR91MSLT+3O7MzKzX2/eYcFoW+dH7mEz+vUiLPy2N0e5AqXb+UmhlFSK6uqq18Jsxb/NoW3e1P2/Jqj1eRrT25Pc/dh5gmr90x1BHDvSvNx7qref75o97GGJq0CowLDIqfzS4NZ77vsyV6/c+ruE2JNPoFroK9EeFBbp818+6jb+ot8td+zcwc/7mUZb7xWqVIu1eNKpnQ0bMq3OVeiPkwXuUiEAp9tX6A/30zl1WLUQpDBPu3Iv6i72/j6xjXq9FQLSeXc8KBvrCZTv9ihHoj2wd6D7DF+lqXWpBtGDZTl9L69xu63uPGL9yYUUDxnI80+X+2fDIwgI9OTntDXXuEp11rsRmmdedqc3Xt+bMDs2D8Og/yABUvVMVLT00eTv2nG5t7wo5AB1GTVw1zzxitoSFqDb1RdaidpTvJGu/6+1C1QJ9gQMHenp65o9adBpzs6SPGCyt87z6LQPDo6IT3rRX61xjngte3yvbqIVTqudvdHOrsI1uZCniyq76xh+Yr5tq4bfrPuFMVlb2D215zvp6zf6mks7xE1qlbt7i7UOt3bsAwIq6u0/fX9m15GtXa4XBuuDD3R2lMNj6zYn2FfUP8jNvorFizb6BRQz0X9s60G/djviHLAakd/GckRNWLcj/jjl2vXYy7qLHwBkH9QbsczvXFRroN2+Fv6e321obgzBq4ldfWCpFVm/havfjnC+3jtD9+S33wbCxKxba6vMDMJgs+di842i901/yVIilXw/Jn7fsCGSgmPpcGUYMivtq/cG+jhroew+eb6qnJ8Iywjl336ELTeT1su0Y6NnZ+SvQLVqxy9eI5WsLBHpIYYF+9sKtqkYEurzG6g0He9u6Urv7wLnmn+hcaEYqT9LKH+D9xRatYkXpCJQyMgiqbvOhUTJCvSTPmy0je/Oath8ZqnetaqMrKi06jbldTUdFRSuk12w41Lso72mPQJeNNT4uYfhpK6nVaxEQFVmM7UWt7fS5m06qhZ7jYsCccBkB3qHnxHOFjQuQefB6A93y2Cn32MlrLrY+X1dv3P9QVcgzdC0o9GSXvylHKBWBUur2vci/OrkNSdFTs5fu+m4Dph9ytO/W02PmYT1dt1o36uYdxzs6aqBPnLFuasUShpGcF9lru2u/qUccqUX2KCbhzfqtAqPyV4/TH+gde006m53z3YG+R7VwZTEkvdPlargNSbthh14qGQTq2nxotHPDkg8CzR/Q52Vq03XcOXsOigSgw5Vr9z5S/5BLXLu3tEzyBvrO2+xo3817+KINegrq/OeK7qatloVWHDHQh45eurykCwJpC4r4j1q6Sl7LUQZCSaC07zHxvN751VqF5fN+U48XVmFR17eDnkV5almWT63T1D9OBtjZ+nzJCP6Gnw2/p/e+k8duzTuOucZcdKCUunT1bgVZdlNPoKtQyPMdueQreT1bTNUpqsCg5Sv1rH6nBZ48p3bUQPfwm79FZhiUpNKiPVKYMnvDZHOQ5jhOy6zv4Dn7Kule+U56jwaZeg6ccbCw91q/+UgPPZWHJ48uWgZEyj1g63OVkfH4v1t2DrpaTdfCUE8XxZHNjigZgXIa6BIoHn7zgs2B7kBdt36jlq4xYMBY3oHDlxo6aqD3GzJnV0mD7/mV8Bypq3WQ//xtJa2oPD/Qq6/X7D2FvdfKtfs9qusMQ1m/3a31sAcJian/Y/NAz8x6vXWXsZdlb3MDvsO92LjC170H4KCu3Qx7X9Xs00se6PmtoB7u0w862nfrP+SL3XpaeZaNZnJPnLnhTKCXxkDPr2y6+8zdXth7LV65y9eI7upmHUbfSk3N+Kmtz1Xm46zX2nw+7pKele6eBHobFeh26GUAYIB7YY/+7NzQJ0nv4h3NO6rCLC3jJ47yvSSc2nWfcFXPdpiWykq2TGsqRqDbdOlXCatK5uArWaDLgLoJM9bNMJ8zO89BL6iP56wDRmw2I2MohgR+WeiCR/OW7BiuZ1XBp4E+KiTFDoEuCwF16jP5hIxSdyHQgfIrJjbpt7KGt979qJ0beqfeuhPxD0f5Xg+j4t52bTY02YCRv1mXr9372FED3Wf4oq9L+lhBC7zBgV9ulNdylOU+s/IrYxf17k2ujYEYOnppobuIzVqweawRK9KpSu1Ne1RqJdA795l8nEAHyrnHj7Olu+68nu46S0svd8vOE+0dJRgOHb3kZsRUJFUhyAy5HfFPOwT6maIE+uhJX801L9tbonnoluVKe0y4qO6DHzrKPRn1KP5/67UIiNG9Fr9l9TN1juZrwfei95sxN3iiEWvGN2474u7LdnUrBYF+n0AHSrF+Q+Zs0/us2dISWp5fwNh/YNzEGeum610sRFr36vdTwiNi33XUQJ+7eHugnu9p2VQn9e59+2+qozl++rqL3hHuBR8pqHthmrmi+R2BPmnm+hm6A92Og+IIdABPjJ++dlpFXdtvPp224wgrjslzTD0bljw3tzglIjL2bUcN9ODtxzvpCXQt9LTFc+yxD/rzvli0bbiR29/KWueF9RwZEehlqMudQAdKs41bj3Yxai3rZav3eFgKT7u10mUhGL0bszwT6EVcLMQS6JG2DPSzF25VM2+so3PaoVfAwk2OcC9mZWX/oGPvSafkHOjdce3JWvzrDvSzRaA36zA6JNVOg+IMC/TWw8KYtgaUYtdu3P9AFUiZegrQAiN9rycmpf7CboGQnfODLn2nHDUXbnq2w3wa6MmOHOjSI1K3+dBYp4b6njerI+WWZaxAjh132jp26lrtynUG5ertbi/wKCjnwOGLDS3fy2pd7mUh0C0Ly4SwsAxQimVmZr3WpuvYC9V0jirWWkSzFmwZYa9WumykYkR3bWkJdNG1/7QjVXRufysD62TcgbyePeejewYs2KB3/nnBw8ltSGpIaMS/CntPAv2ZxwbXU9Myf0KpCJRiY6eumVHS0dLPH6pgSNXmbtsy1GVgl2vzoXF6p+A9F+hJjh7oU2ZvmGREJUZ93+QbIQ/et1dlzNw6d/XM1nvtnlubPER23ntJoE8n0AsGegaBDpRmh49fqWtEy0haidLSb9k56FpsvO2exWU+znq9x8AZlvW/9VdKdAT6Q1sH+qGjlxronaInvysL1PQf8sVOe+y8JvuVd+w16ZTeRyXPz7zwGb54zcvem0An0IEyJT0980d614Mu2IUrlYPenrN2ycYRtvj8AWOWLapY05geBgcJ9NNFDfTEpNSfN2k38q6e9y34yGTRil1D5HWzsrNtNuJdherkCgZeP+27rA0+3ONlPQ6TZq2fRqA/+Q437bHaHQCDzV+6w79CzQGGFKr5z2UHSotva3JK+hvW+szyvHf4uBXzjAyD5wI90dEDXQRNXTPbiEcm8v6VXT2z9hw418wc6lnZVnuerl7bHLJrg7/t8UmtgXlGtMyfORr7JN29H/V/RahMTKtlTKDfKs2BLj1rqlJ/SRabojQESrlwFVx1mvnHOOsfMf0k1KXbs32PiSfiE1J+afTnfRST+Pu+XnO2Gx3mpTHQz5wPqV5Fx/S1gu8v31t9h/Rvj12ub6k0WW3U+5Ydx2Uv8txajXwNuecKPj4Y6Dtvc1E+w9Q5GyfVJNC1WSqqhZ5OCx0oC8ZPXzfV6K5PCRrv4YtWFwwovYOudu0/21zmzErXfu2m/sa27J4N9AQV6MVZWMYugS56DZq5t7IBK6zJ78tCQarFlrl5+/FOBXpDDA32FWv2uVeqMyhP+95GXTtL71Dezj2nW5vvtdzC77WZ8zcHqd/LK++BLoNJG7QeFh4Tl8Q8dKAseBAe8wfVSo82qpWutZiksOnaf9phmRNc0mlRquB69dS5mzXcfeZu+aTWQFN1FZy1m/gZHuYOEOh5JQn03fvPtZDzYkRlTPv88nrjpn49M7nAGuV6V5OLjUv67dDRS5dJxVHex8gw17qO23Qdd76o4zdmzDNvzlLuA92yUlxYHCvFAWXH/CU7/GTJzDoGtnzNoa5a6jIau2OviceXrNrtef1m2AcZmYUXuvI879adh/9Yte5Av+4Dph9ULdA86U6VIDcyCBww0E8VN9ClwtNtwLRDlV2NGSkun0WumwRv846jQ1SLt83zlTFptaujSL0tmZlZr2/YcqSrOkcPjKp4fNdguNUbDva2tM5f2qswZ+HWkepa5xLoBDpQ5qSlZf64bbfxZ6vW9TIZOVBJXksCQrqUpcKgCsGcVl2CQmTZ0Ukz109dsGyn/+JVu70XLts5dPKsDdOGDPtyg2ppXXVyG5JeQf28tniKi5Va5aU90MXhY1fqVTJwYRYtJKupwJJBjp17Tz6xNvjbXpFRcW8V9TOFPYj+0/I1+zw+6zrugoStnB9rhLmLZfc4de+ekWlwRf18C5buHOrk5p2nfz/0MhDo5qVf6XIHypTjp6/XVC29XGu0guU1pUDP7x4dbJ7iJgW9hLyMss8/3M2teek+1ULF8FHQZTDQhd+oJSuMWiTomWtmfnTiZb42rs3949195m6bt2R7wJ4D55pfvHLn01u3I/6lHecuhlZdte7AgN6es/bWauKbLNdWwtaaPSuWQZhZew+eb6IFXVHO17wlOwJUoOeW+0BX922jz4bftcYAVgD2DvVT12s2aTfyjvxDt1arWHuGmt/yfvYw+vlqCQM9vpi7rdk90OV5d+DY5YuruHrmGX3dtGtVs6GPOQCkQiY9LRKIzo18si1HlpPbkCz193nyM1rvjLWupfa66n2Tgi2D+IqzOM6SVXsGq8+ZU0v/HO5bLCwDwGE9ikn4vWwLKYWFNbpJS8GRGnr34V9tH+iTTpY00DVjJq+eYx4L0cy/TF8jOWeVag/KlBXzLAFXrNH4S7/a46muWTaBTqADZd6NWw/eU6EQL//gbfH82pEO1UpPu3Un4u+2CnQpkKVg7tRn8slcnbueyYDD7u7T9+dP7Sub102mLH7kNODJ6nbftUVqYZav2euh7m0CPT/QrxHoQBl34fLtT1UoJMg/+vLUUs8P9Id/s2ULvVo9r7y23cZfeJyV/UO91022V5UlSWVAYVm7btLz8JFzf9OYyatn5wdbydagX73hYB91zrMIdAIdKG+hniij38tLqNsl0FXB2rJz0PXijNQuTOidh39v0HpYRFm6bhLm8jjBZ8Ti5XofTRgZ6Cl2CvRORgV6B7rcgXLj+s2w92UjEOnGLevPZu0Z6K26jL1m5MY2IaHh/5JQl5Z6ab9u5pa50wCT74jFy7Kycn6g99wYFegy1sReYdi5z5RjBu6H/mNKOqCciHoU//96DJxx4CPVQnKR6WR2GonucM/QE1J+ZcR+6PmBHnTV6J3qbt+L/GuLTmOuf+oysFSGujbC/iOn/rljp6yZobdlbmSgyzVv3HbE3aQCK+rZiqzc177nxNPSA6OrUtJgsElV1m/Z4zsAsKPMx1mvTZ61foJsviI1+zpltAveuaFPemgRW+iyIIdqBUfLmtgGBPo1a2w9Gx2T+Pteg2bulu5qbS2A0jH4zc8cmp/W9siUVQbzu5qN2bddf6D7mNdBr9cyINIeq6xlZD5+Xd0vl+W+qaV/YZn7LCwDlFMHj1xqoGr1tys4uz9ZfMRRWnO1dO885iOtlsfXboS9X5RzEREZ97Zq+aaY18HXsxa5FQNdPFaVsQnT15o34ZFC3JGfq2uLEMlSsQ1aBT749tiVevIdSjKavZBA721EoNdvFRgRn5DyK9sHetbrrT8fe1HWBKilf+nXe7Es/QqUX1KITZyxbooqFLNldTfpFrVXsKuCKa9OU7/06vUHP1aHFNJZesKkaj2vnEtX71YodqA3dtxA1+zad7Zl/ZaBUbKqnExHtOVKfEVvlQ82ybK/XgEL18mIfUuYv2LkeVi93pgWuh0D/bX8QPcyItDvxsUn/4pSDSjnrt24/6Gn/4INsr+1dMXXbOxjs25dFUh56r1ypPv/wxr9Tc07jrn2WddxF9X/z1Dvn63jGXpqyO2If9gh0K9aO9DFo+iENwPGLFuqKmJ52tQ2ewZ7Lcs9I+dQHgs0+mzEvW27Tra15jlYtnqvh/TElNpAz5Au97HGdLlLCz0uiRY6gHxnL9yqKvufq0IuQ7p1pSvQ6KDQuve1wl9G3UtLs0WnMaELlu30lTnc46evnV4h/1lxRgnDXH43/kFEzLvFCPTk0hTomqMnr9X5vN/Uo3K98jfB8bNpV7y5V0e9n+zDLp9B1jyYtWDz6IRE668rvmTVHk/1GdLUtcuVz6AO7c+XH+o81TFXWn3y6rcMCLdHoMuOcu26Tzgtg9pcm/nnqc+Uq46cYn0Hyxr7qlISFhPLM3QAzwm9+/DvsxdsGdm6y9grn7h4mFdAc37ampZCJ8+lsbZm+4tbPuaRzY19c1zyC6hsaYVLt7q0xKUXQAr/Ok39k2THtm/2nWmdmvZ0HvDM+ZuDZIcwVeBmq9eSjWbynqwd/4LD8t/yCrZYZCpSWnpmkeaDPzQ00Mdes2WgC9kadcee0206951yXEbCy+OTghvj1LLS83F5bW0HvrotAqKnztk4UVWO3rHV9169/mCv96r2MT+nl/upOIfcg5XqDDL9s3JvU2/PWdvt9W9N/Tsb9o9Pe5lkpz31mfIqFuO7yM9WquNh+leV3qbOfSbvo+QC8N1dgpmPX1+/+Ui3Ln2nnFCFeIoWxFKASmuwWn0v8whmCULn/E02zId0Y0pwS0VA25FNDlmmU/bn9h+1ZPmmbce6REbFP7OVp2qdm6cz7d5/ruW/q/Z90iUqz2Pl9eRZY9V6nubXLXjI35s/hyXE/l2tr2nY2BVfFvV7RjyMfedJoOvcW1sCPd3GgV4w2L89drn+kMAv18n1knMuoWXpsXga8MXo3tWmnGm/L39X1bJzm9wDsna9bLEqo/Bt/X1l850xk1fPCJqyRjumWw7537Msx+xpX2waN27a1zPGqP+t/X1g0LJFfiOXrJg8a8OEcHX95fWKszGMUTIzs15bte5An6Gjly5Vx5Lh41bMk++gKkdjZ84PHjljXvDogoeq7I6cNHP9RPmOIyesmqu+w3L13aYUdUYHgHJO5g2HhUf/cd+3FxovWLrDL2DMssWy1nirLkFXGrYZHi7drCp8k+VQhX+SDNhq1mH0zU59Jh8dHLBwjRROm3cc73D1xv0PVav5xy96/eeC6dWho5ctV2GSoV4rtnHbEWEyD7tN13EXZd5ul76Tj8qSmdrxWbfxF5u0GxWmfj5TBXtu1/5TD2mFdFFId2u9FgGx5l3amvmbitzlmX9ID0Sea3N/cwu9zefjLmXn5H7f3tdMXa8/fbXuQP9+g+d8I+v5ay2/SrUHmSsezg2ftrRfdGiPWaSiVFkFtzwWkd+XPe479Jx4ZvrcTWPPXQqtnJWtf4EYAIC9W/AZj1+X+bsPo+LeCo+IeVcOae3GxCb+NjU1/ae5Olo8Obm5r0ir71FMwpuJiSm/SE3L+PHjx1k/zMnJ+Y9FSbJUyz45Oe1n9x88+vPd+1F/Kcla6rLD2b+f676VEHvJkVew+/OD6v1M85ZsD3S06ySjzHcfONd8+tzgcf2HfLGjeccxt1WYp1Wt65n7oi5e+W4S4qqC81hVpiJU5e3I2Clr5kivSsjtiH9KTwB3PwDAIWVmZr0uc/NXrtvff8OWI123fXOy3b5D55vs//ZC4xcdBw5fbLRr/9mWm3cc77T1mxMdgrcf73zq7E0nI+dZW4uMLQgLj/njuYuhVQ4cvtBoy84THdZsPNR7lWrRy2ItO/ecbnP6XEiNO/ci/8bqYwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOID/DzjpEKhakAIiAAAAAElFTkSuQmCC',
                currency: 'INR',
                // key: 'rzp_test_6RtX3AoqaOQTpA', // Your api key
                key: 'rzp_live_yglmLRY9mDa5Uk', // Your api key
                amount: 50*100,
                order_id: orderId , //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
                prefill: {
                  email: userDetails.email,
                  contact:'',
                  name: ' ',
                },
                theme: {color: Colors.primary},
                send_sms_hash:true
              }
              const key_secret = "6iWHIZLLrQIVnETz6k8KfdzD";
              RazorpayCheckout.open(options).then((data) => {
                // handle success
                
                navigation.navigate('Home')
                const successId = (`Success: ${data.razorpay_payment_id}`);

                const userData = firebase.auth().currentUser;
                db.collection('UserQR').doc('Purchased QR' + userData.uid).update({
                  order_id : orderId,
                  payment_id: successId,
                  userID : userData.uid,
                })
                console.log(`Success: ${data.razorpay_payment_id}`);
              }).catch((error) => {
                // handle failure
                // alert(`Error: ${error.code} | ${error.description}`);
                ToastAndroid.show('Error processing your payment',
                ToastAndroid.LONG
                )
              });
            navigation.navigate('Home',{
              username : state.Codename
            })
            navigation.navigate('BottomTabScreen')

        }
    }

    return(
    <SafeAreaView style={styles.mainContainer}>
    {/* <StatusBar backgroundColor={Colors.primary} /> */}
    
      <View style={styles.topContainer}>
      <View style={styles.backArrowAndSaveContainerStyle}>
        <Ionicons
          name="arrow-back-outline"
          size={24}
        //   color={Colors.dodgerBlue}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <View
        style={{
          justifyContent:'center',
          alignItems:'center',
          marginRight:120,
        }}
        >
        <Image source={require('../../assets/icons8-qr-code-64.png')}
          style={styles.imageContainer}
        />
        </View>
      </View>
      </View>
      
      <View style={styles.bottomProfileContainer}>
      {/* <View style={styles.imageContainer}> */}
      <ScrollView
      // style={{
      //   borderWidth:1,
      //   // marginTop:-80
      // }}
      >
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.nameContainer}>
          <TextInput        
            placeholderTextColor="#000"
            // placeholderTextColor= "#fff"
            placeholder='Full name'
            // value={fullName}
            onChangeText={(value) => handleChangeText('Codename', value)}
            />
      </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.genderDOBContainer}>
          <TextInput        
            placeholderTextColor="#000"
            // placeholderTextColor= "#fff" 
            placeholder='Gender'
            // value={gender}
            // onChangeText={(text) => setGender(text)}
            onChangeText={(value) => handleChangeText('Codegender', value)}
            // autoCompleteType = {'email'}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.AgeOrDOBContainer}>
          <TextInput        
            placeholderTextColor="#000"
            // placeholderTextColor= "#fff" 
            placeholder='Age'
            // value={age}
            // onChangeText={(text) => setAge(text)}
            onChangeText={(value) => handleChangeText('Codeage', value)}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.fullAddressContainer}>
          <TextInput   
            numberOfLines={2}  
            multiline={true}   
            placeholderTextColor="#000"
            placeholder='Full address'
            onChangeText={(value) => handleChangeText('fullAddress', value)}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.fullAddressContainer}>
          <TextInput  
          numberOfLines={2}  
          multiline={true} 
          // maxLength={60}      
            placeholderTextColor="#000"
            // placeholderTextColor= "#fff" 
            placeholder='Emergency contact address'
            // onChangeText={(text) => setFrom(text)}
            // value={from}
            onChangeText={(value) => handleChangeText('Codefrom', value)}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.emailContainer}>
          <TextInput        
            placeholderTextColor="#000"
            // placeholderTextColor= "#fff" 
            placeholder='Blood group'
            // onChangeText={(text) => setFrom(text)}
            // value={from}
            onChangeText={(value) => handleChangeText('Codeblood', value)}
            />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.emailContainer}>
          <TextInput        
            placeholderTextColor="#000"
            // placeholderTextColor= "#fff" 
            placeholder='Emergency number'
            // onChangeText={(text) => setFrom(text)}
            // value={from}
            onChangeText={(value) => handleChangeText('Codeemergency', value)}
            />
      </View>
      </TouchableWithoutFeedback>

      {/* User Personal phone number */}

      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss();}}
      >
      <View style={styles.emailContainer}>
          <TextInput        
            placeholderTextColor="#000"
            placeholder='Phone number'
            onChangeText={(value) => handleChangeText('Codephone', value)}
            />
      </View>
      </TouchableWithoutFeedback>

      {/* User Health documents upload */}
{/* ___________________________________________________________________________________________________________  */}
        <TouchableWithoutFeedback>
          <View
          style={{
            marginTop:30,
            marginLeft:30,
            // borderWidth:1,
            width:'80%',
            paddingLeft:10,

          }}
          onPress={() => navigation.navigate('UploadPic')}
          >
          <Ionicons
          name="cloud-upload-outline"
          size={28}
          color={Colors.dodgerBlue}
          onPress={() => navigation.navigate('UploadPic')}
          />
          <Text
          style={{
            // borderWidth:1,
            width:'70%',
            marginTop:-25,
            marginLeft:40,
            ...Fonts.black16Bold,
            paddingLeft:5
          }}
          onPress={() => navigation.navigate('UploadPic')}
          >Upload Health Reports</Text>
          </View>
        </TouchableWithoutFeedback>


      {/* User information save button ---
      Saves user data to the firebase firestore */}

      <TouchableWithoutFeedback
      // onPress={() => navigation.goBack()}
      onPress={() => navigation.navigate('BottomTabScreen')}
      >
        <View style={styles.buttonMain}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={saveUsers}
      >
      <View>
        <View style={styles.buttonContainer}>
        <Text style={{ ...Fonts.black16Bold, color:'#fff' }}>Proceed to pay</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View>
      </TouchableWithoutFeedback>
      </ScrollView>
    </View>
      {/* <View style={styles.buttonMain}>
      <TouchableOpacity
        activeOpacity={0.9}
        // onPress={fetchUser}
      >
      <View>
        <View style={styles.buttonContainer}>
        <Text style={{ ...Fonts.white16Bold, color:'#000' }}>Let's Change</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View> */}
    </SafeAreaView>
    );
   
}
Generate.navigationOptions = () => {
  return {
    header: () => null,
  };
};

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:"#fff"
    },
    backArrowAndSaveContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: Sizes.fixPadding * 2.0,
    marginRight: Sizes.fixPadding,
    marginTop: Sizes.fixPadding + 15.0,
  },
  nameContainer:{
    // color:'#fff',
    color:'#000',
    borderBottomColor:Colors.dodgerBlue,
    paddingLeft:5,
    // borderBottomColor:"#fff",
    marginLeft: Sizes.fixPadding * 3.0,
    marginRight: Sizes.fixPadding,
    marginTop:20,
    // marginTop:100,
    borderBottomWidth:1,
    width:"80%"
    
  },
  emailContainer:{
    color:'#000',
    borderBottomColor:Colors.dodgerBlue,
    paddingLeft:5,
    // borderBottomColor:"#fff",
    marginLeft: Sizes.fixPadding * 3.0,
    marginRight: Sizes.fixPadding,
    marginTop:40,
    borderBottomWidth:1,
    // borderWidth:1,
    width:"80%" 
  },
  fullAddressContainer:{
    color:'#000',
    borderColor:Colors.dodgerBlue,
    paddingLeft:5,
    marginLeft: Sizes.fixPadding * 3.0,
    marginRight: Sizes.fixPadding,
    marginTop:40,
    borderWidth:1,
    width:"80%" ,
    height:80,
    borderRadius:10
  },
   buttonContainer:{
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius:8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    backgroundColor:Colors.primary,
    width:140,
    marginBottom:15
  },
  buttonMain:{
      alignItems:'center',
      justifyContent:'center',
      marginTop:50,
  },
    topContainer:{
      width:'100%',
      height:'40%',
      borderBottomLeftRadius:100,
      backgroundColor:Colors.bumbleYellow,
  },
   bottomProfileContainer:{
      width:'100%',
      height:'72%',
      marginVertical:-100,
      borderTopRightRadius:90,
      backgroundColor:"#fff",
  },
   imageContainer:{
      width:150,
      height:150,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:100,
      backgroundColor:"#fff",
      marginRight:10
  },
  genderDOBContainer:{
    color:'#000',
    borderBottomColor:Colors.dodgerBlue,
    paddingLeft:5,
    // borderBottomColor:"#fff",
    marginLeft: Sizes.fixPadding * 3.0,
    marginRight: Sizes.fixPadding,
    marginTop:40,
    borderBottomWidth:1,
    width:"40%" 
  },
  AgeOrDOBContainer:{
    color:'#000',
    borderBottomColor:Colors.dodgerBlue,
    // borderBottomColor:'red',
    paddingLeft:5,
    // borderBottomColor:"#fff",
    // marginLeft: Sizes.fixPadding * 3.0,
    marginRight: Sizes.fixPadding,
    marginTop:-29,
    marginLeft:239,
    borderBottomWidth:1,
    width:"30%" 
  },
})
export default Generate;