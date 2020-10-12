"use strict"//严格模式
var myApp = angular.module("myApp", [
    "ng",
    "ngAnimate",
    "ngRoute"
]);
myApp.controller("parentCtrl", ["$scope", "$location", "$http", "$interval", "$rootScope", "$filter", function ($scope, $location, $http, $interval, $rootScope, $filter) {
    $rootScope.a = 0;
    //全局
    $rootScope.aaaa = [];
    $scope.jump = function (url) {
        $location.path(url);
    }
    $scope.msg = "全局";

    $scope.oHref = $location.absUrl().split("#")[0];
    console.log($scope.oHref);
    $scope.getUser = function () {
        $http.get("php/getUsername.php").then(function (response) {
            if (response.data != null) {
                $scope.wxName = response.data;
                $scope.getLocalstroage();
                if ($scope.wxName) {
                    window.localStorage.setItem($scope.oHref, angular.toJson($scope.storageHref));
                    console.log(window.localStorage.getItem($scope.oHref));
                }
                return;
            }
            $scope.wxName = null;
        })
    }
    $scope.getUser();
    $scope.getLocalstroage = function () {
        $scope.storageHref = window.localStorage.getItem($scope.oHref);
        console.log($scope.storageHref);
        $scope.storageHref = $scope.storageHref ? JSON.parse($scope.storageHref) : {};
        console.log($scope.storageHref);
        $scope.storageHref[$scope.wxName] = $scope.storageHref[$scope.wxName] ? $scope.storageHref[$scope.wxName] : {};
        console.log($scope.storageHref);
        console.log($scope.storageHref[$scope.wxName]);
    }


    $scope.createCode = function () {
        $scope.codeName = document.getElementsByClassName("codename")[0];
        $scope.codeArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
        $scope.length = 4;
        $scope.code = "";
        for ($scope.i = 0; $scope.i < $scope.length; $scope.i++) {
            $scope.randomI = Math.floor(Math.random() * 52);
            $scope.code += $scope.codeArr[$scope.randomI];
        }
        console.log($scope.code);
        if ($scope.code) {
            $scope.codeName.innerHTML = $scope.code;
            $scope.randomName = $scope.codeName.innerHTML;
        }
    }

    $scope.randomNum = function () {
        $scope.num = Math.floor(Math.random() * 20) + 1;
        console.log($scope.num);
        $http.get("php/getHeadImg.php?hid=" + $scope.num).then(function (response) {
            console.log(response.data[0].img);
            $scope.headImg = response.data[0].img;
        })
    }

    $http.get("php/getshopes.php").then(function (response) {
        $scope.getshop = response.data;
        $scope.getOrdershop = response.data[0];
        $rootScope.shoplength = $scope.getshop.length;
    })


}])
    .controller("startCtrl", ["$scope", "$interval", "$http", function ($scope, $interval, $http) {
        $http.get("php/getUsername.php").then(function (response) {
            if ($scope.wxName) {
                $scope.num = 7;
                $scope.timeInterval = $interval(function () {
                    $scope.num--;
                    if ($scope.num == 0) {
                        $scope.jump("/m");
                    }
                }, 1000)
                $scope.m = function () {
                    $scope.jump("/m");
                }
            }
        })
        $scope.oncesign = function () {
            $scope.jump('/sn');

        }
        // 立即体验
        $(".wxSign").hide();
        $(".sign").hide();
        $scope.TY = function () {
            $("#myCarousel").hide();
            $(".wxSign").show();
            $(".sign").hide();
        }
        $scope.close = function () {
            $(".sign").hide();
            $("#myCarousel").show();
        }

    }])
    .controller("mainCtrl", ["$scope", "$http", "$interval", "$routeParams", function ($scope, $http, $interval, $routeParams) {
        $scope.getUser();
        $scope.getDate = new Date().getTime();
        $scope.oldDate = $scope.getDate + 86400000;


        $http.get("php/getyi.php")
            .then(function (response) {
                $scope.Caryi = response.data;
                console.log($scope.Caryi);
            })
        $scope.tiao = function () {
            $scope.jump("/more");
        }
        //跳到搜索页面
        $scope.kw = function () {
            $scope.jump("/kw");
        }
        //清仓
        $http.get("php/Getovereid.php")
            .then(function (response) {
                $scope.overeid = response.data;
            })
        //跳转分类页
        $scope.oClass = function () {
            $scope.jump("/class");
        }

        //新品
        $http.get("php/qingshi.php")
            .then(function (response) {
                $scope.qingchi = response.data;
            })
        //筛选
        $http.get("php/shaixuan.php")
            .then(function (response) {
                $scope.shaixuan = response.data;
            })
        $http.get("php/fenlei.php").then(function (response) {
            $scope.List = response.data;
        })
        $scope.hanshu = function (sx) {
            $scope.xiabiao = sx.name;
        }
        $scope.han = function (Li) {
            console.log(Li);
            $scope.shopN = Li.name;
        }
        $scope.zhi = function () {
            $scope.xiabiao = "";
            $scope.shopN = "";
        }

        //去详情页
        $scope.details = function (i) {
            console.log(i);
            $scope.jump("/ws:" + i.pid + ":" + i.shopname);
        }

    }])
    .controller("signCtrl", ["$scope", "$location", "$http", "$rootScope", function ($scope, $location, $http, $rootScope) {
        if ($rootScope.a == 4) {
            $scope.bbbbb = true;
            $scope.aaaaa = false;
        }
        $scope.xiaoshazi = function (num) {
            // 当a=3时，再次点击 全局a=3
            if ($rootScope.a == 3) {
                $scope.aaaaa = false;
                $rootScope.a = 0;
                return;
            }
            if ($rootScope.a == 4) {
                $scope.bbbbb = false;
                $rootScope.a = 0;
                return;
            }
            if (num == 3) {
                $scope.aaaaa = true;
                $scope.bbbbb = false;
                $rootScope.a = 3;
            }

            if (num == 4) {
                $scope.bbbbb = true;
                $scope.aaaaa = false;
                $rootScope.a = 4;
            }
        }
        $scope.agreen = function () {
            console.log($scope.headImg);
            if ($scope.a == 3) {
                $http.get("php/getUser.php?name=" + $(".name").html()).then(function (response) {
                    console.log(response.data);
                })
                $scope.jump('/m');
            }
            if ($scope.a == 4) {
                $http.get("php/getUser.php?name=" + $scope.codeName.innerHTML + "&headimg=" + $scope.headImg).then(function (response) {
                    console.log(response.data);
                })
                $scope.jump('/m');
            }
        }
    }])
    .controller("newUserinfoCtrl", ["$scope", "$location", "$http", "$rootScope", function ($scope, $location, $http, $rootScope) {
        $scope.random = function () {
            $scope.createCode();
            $scope.randomNum();
        }
        console.log($rootScope.a);
        $scope.keep = function () {
            if ($scope.headImg && $scope.codeName.innerHTML) {
                alert("a");
                $scope.jump('/sn');
                $rootScope.a = 4;

            }
        }
    }])
    .controller("personalCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {
        $scope.getUser();
        console.log($scope.wxName);
        $http.get("php/getpersonal.php").then(function (response) {
            console.log(response.data);
            $scope.personal = response.data[0];
        })
    }])
    .controller("moreCtrl", ["$scope", "$http", function ($scope, $http) {
        $scope.getDate = new Date().getTime();
        $scope.oldDate = $scope.getDate + 86400000;
        $http.get("php/getyi.php")
            .then(function (response) {
                $scope.Caryi = response.data;
            })
        $scope.details = function (i) {
            console.log(i);
            $scope.jump("/ws:" + i.pid + ":" + i.shopname);
        }
    }])
    .controller("kwCtrl", ["$scope", "$http", function ($scope, $http) {
        $scope.shopCount = 2;
        $scope.shopList = [];
        $scope.kwList = [];
        $scope.preShop = null;
        $scope.getShopList = function () {
            $http.get("php/getShopList.php?start=" + $scope.shopList.length)
                .then(function (response) {
                    $scope.shopList = response.data;
                    $scope.preLoading();
                })
        }
        $scope.getShopList();
        $scope.preLoading = function () {
            $http.get("php/getShopList.php?start=" + $scope.shopList.length + "&shopList=" + $scope.shopCount)
                .then(function (response) {
                    $scope.preShop = response.data;
                    if ($scope.preShop.length == 0) {
                        $scope.isLoadMore = true;
                    }
                })
        }
        $scope.isLoadMore = false;

        $scope.isLoadMoreShow = true;
        $scope.$watch("kw", function () {
            $http.get("php/dish_getBykw.php?kw=" + $scope.kw)
                .then(function (response) {
                    if (!$scope.kw && $scope.kw != "" && $scope.kw != undefined) return;
                    $scope.dishList = [];
                })
            $scope.isLoadMoreShow = true;
            if (!$scope.kw && $scope.kw != "" && $scope.kw != undefined) return;
            $scope.kwList = [];
            if ($scope.kw == "" || $scope.kw == undefined) {
                $scope.getShopList();
                $scope.isNoList = false;
                $scope.isLoadMoreShow = true;
            } else {
                $http.get("php/dish_getBykw.php?kw=" + $scope.kw)
                    .then(function (response) {
                        $scope.isLoadMoreShow = false;
                        if (response.data.length == 0) {
                            $scope.isNoList = true;
                            console.log("没有数据");
                        } else {
                            $scope.isNoList = false;
                        }
                        $scope.kwList = response.data;
                        $scope.shopList = [];
                    })
            }
        })
        $http.get("php/getyi.php")
            .then(function (response) {
                $scope.Caryi = response.data;
            })


        $scope.off = function () {
            $scope.jump("/m");
        }
        $scope.details = function (i) {
            console.log(i);
            $scope.jump("/ws:" + i.pid + ":" + i.shopname);
        }
    }])
    .controller("classifyCtrl", ["$scope", "$http", function ($scope, $http) {
        $scope.fen = function () {
            $scope.jump("/m");
        }
        $scope.lei = function () {
            $scope.jump("/kw");
        }
        //分类左侧盒子
        $http.get("php/fenlei.php")
            .then(function (response) {
                $scope.data = response.data;
            })
        //分类右侧盒子
        $scope.mmm = 0;
        $http.get("php/GETfenlei.php?pinid=" + ($scope.mmm + 1)).then(function (response) {
            $scope.shopList = response.data;
            console.log($scope.shopList);
        })
        $scope.fenl = function (index) {
            $scope.mmm = (index.pinid - 1);
            $http.get("php/GETfenlei.php?pinid=" + ($scope.mmm + 1)).then(function (response) {
                $scope.shopList = response.data;
                console.log($scope.shopList);
            })
        }

    }])
    .controller("vipCtrl", ["$scope", "$http", function ($scope, $http) {
        $scope.msg = "会员";
    }])
    .controller("detailsCtrl", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
        $scope.msg = "详情";
        $scope.row = $routeParams.aid;
        console.log($scope.row);
        $http.get("php/GETdetails.php?aid=" + $scope.row)
            .then(function (response) {
                $scope.data = response.data;
                $scope.shop = response.data[0].brand;
                $scope.bImg = response.data[0].brandImg;
                $scope.bentm = response.data[0].recommend;
                $scope.dabj = response.data[0].daimg;
                $scope.num = '1';
                $scope.nowBuy = function (data) {
                    $http.get("php/shopCarOrder.php?shopName=" + $scope.data[0].shopName + "&shopprice=" + $scope.data[0].price + "&shopimg=" + $scope.data[0].img_sm + "&shopnum=" + $scope.num)
                        .then(function (response) {
                            console.log(response.data);
                            $scope.jump("/order/" + $scope.data[0].aid);
                        })
                }
            })
        $scope.joincar = function (join) {
            console.log(join);
        }
    }])
    .controller("orderCtrl", ["$scope", "$location", "$http", "$routeParams", "$interval", function ($scope, $location, $http, $routeParams, $interval) {
        $http.get("php/GETdetails.php")
            .then(function (response) {
                $scope.shopdata = response.data[0];
                console.log($scope.shopdata.DeliveryAddr);
                if ($scope.shopdata.DeliveryAddr == null) {
                    $scope.tjaddr = 1;
                }
                $scope.Gobye = function () {
                    if ($scope.shopdata.DeliveryAddr == null) {
                        alert("請添加地址");
                    } else {
                        $("#ordermsg").show();
                        $(".aaa").show();
                    }

                }
                $(".zhiwensuc").hide();
            })

        $http.get("php/addrall.php?did=" + ($routeParams.did).split(":")[3])
            .then(function (response) {
                $scope.kk = response.data;
                console.log(response.data);
                for (var u = 0; u < response.data.length; u++) {
                    $scope.addr = response.data[u];
                }
            })
        $scope.oorrddeerr = function () {
            $("#peisong").fadeIn();
        }

        $scope.updata = function (obj) {
            $scope.d = obj.DeliveryAddr + ":" + obj.DeliveryName + ":" + obj.Deliveryphone + ":" + obj.Deliveryhouse;
            console.log($scope.d);
            $scope.jump("/newaddr" + $routeParams.did);
        }

        $scope.pay = "";
        $scope.qy = ($routeParams.did).split(":")[3];
        $http.get("php/getOrder.php?orderId=" + $scope.qy).then(function (response) {
            $scope.getordername = response.data[0];
            $scope.getorderdata = response.data;
            console.log($scope.getorderdata);
            $scope.addrrdda = function () {
                $scope.jump("/newaddr:" + $scope.getordername.pid + ":" + $scope.getordername.ordername + ":" + $scope.getordername.orderId);
            }
            if ($scope.getordername.model) {
                $scope.ordermodel = ($scope.getordername.model).split(";")[0];
            }
            // 确认取消
            $scope.aaa = {
                'pid': $scope.getordername.pid,
                'orderId': $scope.getordername.orderId,
                'allprice': $scope.getordername.allprice,
                'ordername': $scope.getordername.ordername,
                'orderImg': $scope.getordername.orderImg,
                'orderprice': $scope.getordername.orderprice,
                'orderNum': $scope.getordername.orderNum,
                'orderTime': $scope.getordername.orderTime
            }
            $scope.confirebye = function () {
                $http.post("php/uporderstatu.php?" + $.param($scope.aaa)).then(function (response) {
                    console.log(response.data);
                    $scope.jump("/mo");
                })
            }
            $scope.zhiwen = function () {
                $(".zhiwen").hide();
                $(".zhiwensuc").show();
                $http.post("php/upordersucstatu.php?" + $.param($scope.aaa)).then(function (response) {
                    console.log(response.data);
                    $scope.jump("/mo");
                })
            }

            $scope.nowpay = function () {
                if ($scope.pay == "") {
                    alert("请选择支付方式");
                } else {
                    alert($scope.pay);
                    if ($scope.pay == "微信") {
                        alert("a");

                        $http.post("php/uporderstatu.php?" + $.param($scope.aaa)).then(function (response) {
                            console.log(response.data);
                            $scope.jump('/wx' + $routeParams.did);
                        })
                    } else {
                        alert("b");
                        $("#zhifubaopay").show();
                    }
                }
            }

        })

        console.log(($routeParams.did).split(":")[1]);


        // 继续支付
        $scope.jixupay = function () {
            $("#canelmodel").hide();
            $(".aaa").hide();
        }

        $scope.$on("$destroy", function () {
            $('.modal-backdrop').remove();
            $('body').removeClass("modal-open");
        })
    }])
    // 微信支付页面
    .controller("weixinpayCtrl", ["$scope", "$location", "$http", "$routeParams", "$interval", function ($scope, $location, $http, $routeParams, $interval) {
        $scope.msg = "微信支付页面";

        $scope.wxdid = $routeParams.did.split(":")[1];
        console.log($scope.wxdid);

        // 地址
        $http.get("php/getwxOrder.php?wxdid=" + $scope.wxdid).then(function (response) {
            $scope.wxOrder = response.data[0];
            console.log($scope.wxOrder);
        })

        $scope.wxonPay = function () {
            $(".wxpay").show();
        }
        $scope.close = function () {
            $(".wxpay").hide();
            $("#mymodal1").hide();
        }

        $scope.money = function () {
            alert("a");
            $(".modal").show();
        }

        $(".xiaq_tb").click(function () {
            $(".numb_box").slideUp(500);
        });
        $(".mm_box").click(function () {
            $(".numb_box").slideDown(500);
        });


        $scope.zwpay = function () {
            $("#mymodals").hide();
            alert("支付成功");
            $http.get("php/upordersucstatu.php?did=" + ($routeParams.did).split(":")[1] + "&ordername=" + ($routeParams.did).split(":")[2] + "&orderId=" + ($routeParams.did).split(":")[3]).then(function (response) {
                console.log(response.data);
                $scope.jump("/mo");
            })

        }

        $scope.cancelwxPay = function () {
            alert("您已取消支付");
            $scope.jump("/mo");
        }


        var i = 0;
        $(".nub_ggg li .zf_num").click(function () {

            if (i < 6) {
                $(".mm_box li").eq(i).addClass("mmdd");
                $(".mm_box li").eq(i).attr("data", $(this).text());
                i++
                if (i == 6) {
                    setTimeout(function () {
                        var data = "";
                        $(".mm_box li").each(function () {
                            data += $(this).attr("data");
                        });
                        alert("支付成功" + data);
                        $http.get("php/upordersucstatu.php?did=" + ($routeParams.did).split(":")[1] + "&ordername=" + ($routeParams.did).split(":")[2] + "&orderId=" + ($routeParams.did).split(":")[3]).then(function (response) {
                            console.log(response.data);
                            $scope.jump("/mo");
                        })
                    }, 100);
                };
            }
        });

        $(".nub_ggg li .zf_del").click(function () {
            if (i > 0) {
                i--
                $(".mm_box li").eq(i).removeClass("mmdd");
                $(".mm_box li").eq(i).attr("data", "");
            }
        });

        $(".nub_ggg li .zf_empty").click(function () {
            $(".mm_box li").removeClass("mmdd");
            $(".mm_box li").attr("data", "");
            i = 0;
        });
        $scope.$on("$destroy", function () {
            // $interval 提供了清除定时器事件
            $('.modal-backdrop').remove();
            $('body').removeClass("modal-open");
        })
    }])
    //地址页
    .controller("newaddrCtrl", ["$scope", "$http", "$routeParams", "$location", function ($scope, $http, $routeParams, $location) {
        $scope.abc = $routeParams.did;
        console.log($scope.abc);
        $scope.msg = "newaddress.html页面";

        $scope.comment = {};
        $scope.comment.name = ""; //联系人
        $scope.comment.tel = ""; //电话
        $scope.comment.addr = ""; //地址
        $scope.comment.doorplate = ""; //门牌号

        if ($scope.abc.length > 22) {
            $http.get("php/addrall.php")
                .then(function (response) {
                    console.log(response.data[0]);
                    $scope.datae = response.data[0];
                    $scope.comment.name = response.data[0].DeliveryName;
                    $scope.comment.tel = response.data[0].Deliveryphone;
                    $scope.comment.addr = "3";
                    $scope.comment.doorplate = response.data[0].Deliveryhouse;
                })
        }

        $scope.provincesIndex = "";
        $scope.citiesIndex = "--";
        $scope.areasIndex = "--";
        // //省
        $scope.getP = function () {
            $http.get("php/getProvinces.php")
                .then(function (response) {
                    $scope.provinces = response.data;
                })
        }
        $scope.getP();
        // //市
        $scope.getC = function (a) {
            $http.get("php/getCities.php?index=" + a)
                .then(function (response) {
                    if (response.data.length == 0 && angular.isArray(response.data)) {
                        $scope.cities = null;
                        return;
                    }
                    $scope.cities = response.data;
                    $scope.citiesIndex = $scope.cities[0].city;
                    $scope.getA($scope.citiesIndex);
                })
        }
        $scope.getC();
        // //县
        $scope.getA = function (b) {
            $http.get("php/getareas.php?index=" + b)
                .then(function (response) {
                    if (response.data.length == 0 && angular.isArray(response.data)) {
                        $scope.areas = null;
                        return;
                    }
                    $scope.areas = response.data;
                    $scope.areasIndex = $scope.areas[0].area;
                })
        }
        $scope.getA();
        // //监听城市的改变
        $scope.$watch("provincesIndex", function () {
            $scope.getC($scope.provincesIndex);
        })
        $scope.$watch("citiesIndex", function () {
            $scope.getA($scope.citiesIndex);
        })
        $scope.addAddrBtn = function () {
            //提交数据、
            var comment = jQuery.param($scope.comment);
            console.log(comment);
            $http.get("php/addr.php?" + comment + "&DeliveryAddr=" + $scope.provincesIndex + $scope.citiesIndex + $scope.areasIndex)
                .then(function (response) {
                    console.log(response.data);
                    $scope.jump("/o" + $routeParams.did);
                })
        }
        $scope.Ensure = function () {
            var Ensure = jQuery.param($scope.comment);
            console.log(Ensure);
            console.log($scope.comment.name);
            $http.get("php/xiudada.php?" + Ensure + "&DeliveryName=" + $scope.comment.name + "&Deliveryphone=" + $scope.comment.tel + "&doorplate=" + $scope.comment.doorplate)
                .then(function (response) {
                    console.log(response.data);
                    $scope.jump("/o" + $routeParams.did);
                })
        }

    }])
    // 种草页面
    .controller("wantBuyCtrl", ["$scope", "$location", "$http", "$rootScope", function ($scope, $location, $http, $rootScope) {

        $('.category ul li').click(function () {
            var indexC = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('.cont').eq(indexC).addClass('active').siblings().removeClass('active');
        })

        $http.get("php/getyi.php")
            .then(function (response) {
                $scope.Caryi = response.data;
            })

        $http.get("php/getwantImg.php").then(function (response) {
            $scope.getwangmsg = response.data;
            console.log($scope.getwangmsg);
        })
        $scope.details = function (i) {
            console.log(i);
            $scope.jump("/ws:" + i.pid + ":" + i.shopname);
        }

    }])
    // 种草详情页
    .controller("wangDetailsCtrl", ["$scope", "$location", "$http", "$routeParams", "$interval", function ($scope, $location, $http, $routeParams, $interval) {
        $routeParams.did = $routeParams.did.split(":")[1];
        console.log($routeParams.did);

        $http.get("php/getwantDetails.php?did=" + $routeParams.did).then(function (response) {
            $scope.getwangdetails = response.data[0];
            console.log($scope.getwangdetails.de_img);
            $scope.getwangdetails.de_img = ($scope.getwangdetails.de_img).split(";");
            console.log($scope.getwangdetails);
            $scope.getwangdetailsImg = $scope.getwangdetails.de_img;
        })


        $scope.dameili = {
            startx: null,
            starty: null,
            moveEndX: null,
            moveEndY: null,
            X: null,
            Y: null,
            m: 0,
            ML: 0,
            getAngle: function (angx, angy) {
                return Math.atan2(angy, angx) * 180 / Math.PI;
            },
            getDirection: function (startx, starty, endx, endy) {
                var THIS = this;
                var angx = endx - THIS.startx;
                var angy = endy - THIS.starty;
                var result = 0;
                //如果滑动距离太短
                if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
                    return result;
                }
                var angle = $scope.dameili.getAngle(angx, angy);
                if (angle >= -135 && angle <= -45) {
                    result = 1;
                } else if (angle > 45 && angle < 135) {
                    result = 2;
                } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                    result = 3;
                } else if (angle >= -45 && angle <= 45) {
                    result = 4;
                }
                return result;
            },
            touchS: function (e) {
                $scope.dameili.startx = e.touches[0].pageX;
                $scope.dameili.starty = e.touches[0].pageY;
            },
            touchE: function (e, m) {
                var THIS = this;
                var endx, endy;
                endx = e.changedTouches[0].pageX;
                console.log(endx);
                endy = e.changedTouches[0].pageY;
                console.log(endy);
                var enda = endx - endy;
                console.log(enda);
                var direction = $scope.dameili.getDirection(THIS.startx, THIS.starty, endx, endy);
                switch (direction) {
                    case 0:
                        // alert("未滑动！");
                        console.log("a");
                        $(".allImg").css({ "margin-left": 0 });
                        console.log($(".allImg"));
                        console.log("b");

                        break;
                    case 1:
                        // alert("向上！");
                        break;
                    case 2:
                        // alert("向下！");
                        break;
                    case 3:
                        // alert("向左！");
                        console.log($(".img").length);
                        if (-enda > $(".img").width() / 2) {
                            if ($scope.dameili.m < $(".img").length - 1) {
                                $scope.dameili.m++;
                            }
                        }
                        break;
                    case 4:
                        if ($scope.dameili.m > 0) {
                            $scope.dameili.m--;
                        }
                        break;
                    default:
                }
                $(".allImg").animate({ "margin-left": $scope.dameili.m * -$(".img").width() + "px" }, "slow");
                $scope.dameili.ML = $scope.dameili.m * - $(".img").width();
                console.log($scope.dameili.ML);
            },
            touchM: function (e) {
                $scope.dameili.moveEndX = e.changedTouches[0].pageX;
                // console.log($scope.dameili.moveEndX);
                $scope.dameili.moveEndY = e.changedTouches[0].pageY;
                // console.log($scope.dameili.moveEndY);
                $scope.dameili.X = $scope.dameili.moveEndX - $scope.dameili.startx;
                // console.log($scope.dameili.X);
                $scope.dameili.Y = $scope.dameili.moveEndY - $scope.dameili.starty;
                // console.log($scope.dameili.Y);
                console.log(this);
                if (Math.abs($scope.dameili.X) > 0) {
                    // console.log($(".img").width() * -1);
                    // $(".allImg").animate({ marginLeft: '-=384px' });

                    $scope.dameili.move(this, $scope.dameili.X, $scope.dameili.m);
                }
                if (Math.abs($scope.dameili.Y) < 0 * -1) {
                    // alert("bb");
                    $(".allImg").animate({ marginRight: '+=384px' });
                }
                if (Math.abs($scope.dameili.X) > Math.abs($scope.dameili.Y) && $scope.dameili.X > 0) {

                    console.log("向右");

                }

                else if (Math.abs($scope.dameili.X) > Math.abs($scope.dameili.Y) && $scope.dameili.X < 0) {

                    console.log("向左");

                }

                else if (Math.abs($scope.dameili.Y) > Math.abs($scope.dameili.X) && $scope.dameili.Y > 0) {

                    console.log("向下");

                }

                else if (Math.abs($scope.dameili.Y) > Math.abs($scope.dameili.X) && $scope.dameili.Y < 0) {

                    console.log("向上");

                }

                else {

                    console.log("没滑动");

                }
            },

            move: function (obj, a, m) {
                console.log($scope.dameili.ML);
                obj.style.marginLeft = $scope.dameili.ML + a + "px";
            },
        }
        //获得角度


        //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
        //手指接触屏幕
        var oallImg = document.querySelector(".allImg");
        oallImg.addEventListener("touchstart", $scope.dameili.touchS, false);
        //手指离开屏幕
        // document.addEventListener("touchend", $scope.dameili.touchE, false);

        oallImg.addEventListener("touchmove", $scope.dameili.touchM, false);
        oallImg.addEventListener("touchend", $scope.dameili.touchE, false);
        // $(".allImg").addEventListener("move", $scope.dameili.move, false);

        $http.get("php/getshopDetails.php?did=" + $routeParams.did).then(function (response) {
            $scope.getshopdetails = response.data[0];
            console.log($scope.getshopdetails.pid);
            $scope.gobuy = function () {
                $scope.jump('/ws:' + $routeParams.did + ":" + $scope.getshopdetails.shopname);
            }
        })

    }])

    // 商品购买详情
    .controller("wangshopCtrl", ["$scope", "$location", "$http", "$routeParams", "$interval", function ($scope, $location, $http, $routeParams, $interval) {
        console.log($routeParams.did);
        $http.get("php/getshopname.php?shopname=" + ($routeParams.did).split(":")[2]).then(function (response) {
            $scope.getshopname = response.data[0];
            console.log($scope.getshopname);
            $scope.shopDeimg = ($scope.getshopname.shop_deimg).split(";");
            if ($scope.getshopname.model) {
                $scope.shopModel = ($scope.getshopname.model).split(";");
            }

            console.log($scope.shopModel);
            console.log($scope.getshopname.pid);
            $scope.joincar = function () {
                if ($scope.getshopname.model) {
                    $("#shopmodel").show();
                    $(".aaa").show();
                    console.log($(".storemodel"));
                    console.log($scope.num);
                    $scope.storemodel = function (e) {
                        var e = window.event || e;
                        console.log(e.target);

                        e.target.style.background = "grey";
                        e.target.nextElementSibling.style.background = "#f2f2f2";
                        e.target.previousElementSibling.style.background = "#f2f2f2";
                        $scope.success = function () {
                            $scope.quxiaoorder = {
                                "pid": $scope.getshopname.pid,
                                "allprice": $scope.getshopname.oldprice,
                                "ordername": $scope.getshopname.shopname,
                                "orderprice": $scope.getshopname.oldprice,
                                "orderImg": $scope.getshopname.shopImg,
                                "sbrand": $scope.getshopname.brand,
                            }
                            $http.post("php/getorderdata.php?" + $.param($scope.quxiaoorder)).then(function (response) {
                                $scope.getorderdata = response.data;
                                console.log($scope.getorderdata.msgss);
                                if (response.data.msg = "ok") {
                                    alert("添加成功");
                                    $("#shopmodel").hide();
                                    $(".aaa").hide();
                                    location.reload();
                                }
                            })

                        }
                    }
                } else {
                    $scope.quxiaoorder = {
                        "pid": $scope.getshopname.pid,
                        "allprice": $scope.getshopname.oldprice,
                        "ordername": $scope.getshopname.shopname,
                        "orderprice": $scope.getshopname.oldprice,
                        "orderImg": $scope.getshopname.shopImg,
                        "sbrand": $scope.getshopname.brand,
                    }
                    $http.post("php/getorderdata.php?" + $.param($scope.quxiaoorder)).then(function (response) {
                        $scope.getorderdata = response.data;
                        console.log($scope.getorderdata.msgss);
                        if (response.data.msg = "ok") {
                            alert("添加成功");
                            location.reload();
                        }
                    })

                }


            }

            console.log($scope.getshopname);
            $scope.nowBuy = function () {
                $scope.quxiaoorder = {
                    "pid": $scope.getshopname.pid,
                    "allprice": $scope.getshopname.oldprice,
                    "ordername": $scope.getshopname.shopname,
                    "orderprice": $scope.getshopname.oldprice,
                    "orderImg": $scope.getshopname.shopImg
                }
                $http.post("php/getorderdata.php?" + $.param($scope.quxiaoorder)).then(function (response) {
                    $scope.getorderdata = response.data;
                    console.log($scope.getorderdata.msgss);
                    $scope.jump('/o' + $routeParams.did + ":" + $scope.getorderdata.msgss);
                })

            }
        })




        $scope.joincar = function () {

            $scope.jump('/sc' + $routeParams.did);

        }
        $scope.orderMonth = new Date().getMonth() + 1;//获取当天
        console.log($scope.orderMonth);
        $scope.orderDay = new Date().getDate();//获取当天
        console.log($scope.orderDay);
        $scope.serviceTime = $scope.orderDay + 7;//获取加上num后的day
        console.log($scope.serviceTime);


    }])
    // 我的订单页面
    .controller("myorderCtrl", ["$scope", "$http", "$location", "$filter", "$interval", "$routeParams", "$rootScope", function ($scope, $http, $location, $filter, $interval, $routeParams, $rootScope) {
        $('.category ul li').click(function () {
            var indexC = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('.cont').eq(indexC).addClass('active').siblings().removeClass('active');
        })
        $scope.setTime = function (obj) {
            console.log(obj);
            console.log(obj.orderInterval);
            if (obj.orderInterval) {
                $interval.cancel(obj.orderInterval);
            }
            obj.timer11 = {
                aaa: new Date(Number(obj.orderTime))
            };
            if ((new Date().getTime() - obj.orderTime) < 15 * 60 * 1000) {

                obj.timer11.nowTime = new Date();
                obj.timer11.sTime = new Date().getTime() - obj.orderTime;
                obj.timer11.timeaa = function () {
                    var THIS = this;
                    var roundNum = (15 * 60 * 1000 - THIS.sTime) / 1000;
                    var tempNum = (15 * 60 * 1000 - THIS.sTime) / 1000;
                    var countDownTime = function () {
                        console.log(THIS.sTime);
                        tempNum--;
                        var minutes = parseInt(tempNum / 60) >= 10 ? parseInt(tempNum / 60) : "0" + parseInt(tempNum / 60);
                        var seconds = parseInt(tempNum % 60) >= 10 ? parseInt(tempNum % 60) : "0" + parseInt(tempNum % 60);
                        if (tempNum < 0) {
                            $interval.cancel(obj.orderInterval);
                            obj.orderInterval = null;
                            var msg = {
                                'orderstatu': 4,
                                'orderId': obj.orderId
                            }
                            $http.get("php/upStatu.php?" + $.param(msg)).then(function (response) {
                                console.log(response);
                                if (response.data.msg = "ok") {
                                    location.reload();
                                }
                            });

                            return;
                        }
                        obj.countTime = minutes + " : " + seconds;
                    }
                    countDownTime();
                    obj.orderInterval = $interval(countDownTime, 1000, roundNum);
                }
                obj.timer11.timeaa();
            } else {
                obj.countTime = $filter("date")(obj.timer11.aaa, "yyyy-MM-dd HH:mm:ss");
                $("#Time").text("您的订单已超时");
            }
            console.log(obj.timer11);
        }
        $http.get("php/getmyOrder.php").then(function (response) {
            for ($scope.i = 0; $scope.i < response.data.length; $scope.i++) {
                $scope.setTime(response.data[$scope.i]);
                $scope.quxiaoorder(response.data[$scope.i]);
            }
            $scope.getMyorder = response.data;
            console.log($scope.getMyorder);
            if ($scope.getMyorder.length == 0) {
                alert("订单为空");
            }

        })
        $scope.quxiaoorder = function (obj) {
            console.log(obj);
            if (obj.orderstatu === "1" && (new Date().getTime()) > 1575804899481) {
                console.log("222222");
                obj.orderstatu = 2;
                $http.post("php/upStatu.php?orderId=" + obj.orderId + "&orderstatu=" + obj.orderstatu).then(function (response) {
                    console.log(response);
                })
                return 1;
            }
        }

        $scope.$on("$destroy", function () {
            // $interval 提供了清除定时器事件
            for ($scope.i = 0; $scope.i < $scope.getMyorder.length; $scope.i++) {
                console.log($scope.getMyorder[$scope.i]);
                $interval.cancel($scope.getMyorder[$scope.i].orderInterval);
                $scope.getMyorder[$scope.i].timer11 = null;
                $scope.getMyorder[$scope.i].orderInterval = null;
            }
        })
        $scope.go = function (e, k, s, d) {
            var e = e || window.event;
            console.log(k);
            e.stopPropagation();
            console.log(k);
            console.log(k.pid);
            console.log(k.ordername);
            console.log(k.orderId);
            $scope.jump("/o:" + k.pid + ":" + k.ordername + ":" + k.orderId);
        }

    }])
    .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.defaults.transformRequest = function (data) {
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        }
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-from-urlencoded;charset=UTF-8';
    }])
    // 我的购物车
    .controller("shopCarCtrl", ["$scope", "$location", "$http", "$routeParams", function ($scope, $location, $http, $routeParams) {
        $scope.allprice = 0;
        $scope.shopname = "";
        $http.get("php/getshopes.php").then(function (response) {
            $scope.getshop = response.data;
            $scope.getOrdershop = response.data[0];
            console.log($scope.getshop);
            console.log($scope.getshop.length);
            var ocomm = document.getElementsByClassName("commodity");
            console.log(ocomm);
            for ($scope.k = 0; $scope.k < $scope.getshop.length; $scope.k++) {
                console.log($scope.getshop[$scope.k].sbrand);
            }

            for ($scope.j = 0; $scope.j < $scope.getshop.length; $scope.j++) {
                $scope.allprice += $scope.getshop[$scope.j].orderprice * $scope.getshop[$scope.j].orderNum;
                console.log($scope.allprice);

                console.log($scope.getshop[$scope.j].orderprice);

                $scope.allSelect = function (obj) {
                    var ck = document.getElementsByClassName("che");
                    var otex = document.getElementsByClassName("tex");
                    for ($scope.i = 0; $scope.i < ck.length; $scope.i++) {
                        ck[$scope.i].checked = true;
                    }
                    for ($scope.j = 0; $scope.j < otex.length; $scope.j++) {
                        $scope.allprice += otex[$scope.j].value * $scope.getshop[$scope.j].orderprice;
                    }
                }
            }

            console.log($scope.getOrdershop);
            $scope.aaa = function (j) {
                console.log(j.sName);
                $scope.account = function () {
                    $scope.jump("/o:" + j.oid + ":" + j.ordername + ":" + j.orderId);
                }

            }

            $scope.jisuan = function () {
                if ($scope.getshop.length == 1) {
                    $scope.jump("/o:" + $scope.getOrdershop.oid + ":" + $scope.getOrdershop.ordername + ":" + $scope.getOrdershop.orderId);
                }
                console.log($scope.getOrdershop);
            }



        })


        $scope.checkNum = function (sign, obj) {
            console.log(obj);
            switch (sign) {//添加商品
                case "+":
                    ++obj.orderNum;//数量++
                    $scope.shopCarAdd(obj);
                    return;
                case "-"://删除商品
                    --obj.orderNum;
                    $scope.shopCarRemove(obj);
                    return;

            }
        }

        $scope.shopCarAdd = function (obj) {
            $scope.allprice += obj.orderprice * 1;
        }
        $scope.shopCarRemove = function (obj) {
            console.log(obj);
            $scope.allprice -= obj.orderprice * 1;
        }


        $scope.noallSelect = function () {
            var ck = document.getElementsByClassName("che");
            for (var i = 0; i < ck.length; i++) {
                ck[i].checked = false;
                $scope.allprice = 0;
            }

        }

        $scope.checkPrice = function (i) {
            console.log($scope.getshop[i]);
            console.log(angular.element(".chep"));
            $scope.ochep = angular.element(".chep");
            if ($scope.ochep[i].checked == false) {
                $scope.allprice -= $scope.getshop[i].orderNum * $scope.getshop[i].orderprice;
            } else {
                $scope.allprice += $scope.getshop[i].orderNum * $scope.getshop[i].orderprice;
            }
        }


        $scope.cheb = function (m) {
            console.log(document.getElementsByClassName("cheb")[m].parentNode.children[6].childNodes[1].childNodes[1]);
            $scope.asd = document.getElementsByClassName("cheb")[m].parentNode.children[6].childNodes[1].childNodes[1];
            $scope.ochep = angular.element(".chep");
            if (angular.element(".cheb")[m].checked == false) {
                console.log("a");
                $scope.asd.checked = false;
                $scope.allprice -= $scope.getshop[m].orderNum * $scope.getshop[m].orderprice;
            } else {
                $scope.asd.checked = true;
                $scope.allprice += $scope.getshop[m].orderNum * $scope.getshop[m].orderprice;
            }
        }




        $scope.$on("$destroy", function () {
            // $interval 提供了清除定时器事件
            $('.modal-backdrop').remove();
            $('body').removeClass("modal-open");
        })

    }])
    .controller("CserviceCtrl", ["$scope", "$location", "$http", "$routeParams", function ($scope, $location, $http, $routeParams) {

    }])
    .controller("GoldenbeansCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {

    }])
    .controller("SigninCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {

    }])
    .controller("LimitedCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {
        $http.get("php/getLimited.php?").then(function (response) {
            $scope.getLimited = response.data;
        });
    }])
    .controller("informationCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {

    }])
    .controller("brandCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {
        $http.get("php/getbrand.php?").then(function (response) {
            $scope.getbrand = response.data;
            console.log($scope.getbrand);
        });
    }])

    .controller("CustomerServiceCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {

    }])
    .controller("introduceCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {

    }])
    .controller("ComplaintCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {

    }])
    .controller("cooperationCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {

    }])
    .controller("FreeshippingCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {

    }])
    .controller("AwardCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {

    }])
    .controller("footerCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {
    }])

    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider
            .when("/s", {//App首页面
                templateUrl: "tpl/start.html",
                controller: "startCtrl"
            })
            .when("/m", {//首页面菜单页
                templateUrl: "tpl/main.html",
                controller: "mainCtrl"
            })
            .when("/more", {//点击更多加载页面
                templateUrl: "tpl/more.html",
                controller: "moreCtrl"
            })
            .when("/kw", {//搜索页
                templateUrl: "tpl/kw.html",
                controller: "kwCtrl"
            })
            .when("/class", {//分类菜单页
                templateUrl: "tpl/classify.html",
                controller: "classifyCtrl"
            })
            .when("/member", {//会员页
                templateUrl: "tpl/member.html",
                controller: "memberCtrl"
            })
            .when("/details/:aid", {//详情
                templateUrl: "tpl/details.html",
                controller: "detailsCtrl"
            })
            .when("/newaddr:did", {//店铺用户登录页
                templateUrl: "tpl/newaddr.html",
                controller: "newaddrCtrl"
            })
            .when("/nu", {
                templateUrl: "tpl/newUserinfo.html",
                controller: "newUserinfoCtrl"
            })
            .when("/sn", {
                templateUrl: "tpl/sign.html",
                controller: "signCtrl"
            })
            .when("/footer", {
                templateUrl: "tpl/footer.html",
                controller: "footerCtrl"
            })
            .when("/per", {
                templateUrl: "tpl/personal.html",
                controller: "personalCtrl"
            })
            .when("/wb", {
                templateUrl: "tpl/wantBuy.html",
                controller: "wantBuyCtrl"
            })
            .when("/wd:did", {
                templateUrl: "tpl/wangDetails.html",
                controller: "wangDetailsCtrl"
            })
            .when("/wx:did", {
                templateUrl: "tpl/weixinpay.html",
                controller: "weixinpayCtrl"
            })
            .when("/ws:did", {
                templateUrl: "tpl/wangshop.html",
                controller: "wangshopCtrl"
            })
            .when("/o:did", {
                templateUrl: "tpl/order.html",
                controller: "orderCtrl"
            })
            .when("/mo", {
                templateUrl: "tpl/myorder.html",
                controller: "myorderCtrl"
            })
            .when("/vip", {
                templateUrl: "tpl/vip.html",
                controller: "vipCtrl"
            })
            .when("/sc", {
                templateUrl: "tpl/shopCar.html",
                controller: "shopCarCtrl"
            })
            .when("/cs", {
                templateUrl: "tpl/Cservice.html",
                controller: "CserviceCtrl"
            })
            .when("/p", {
                templateUrl: "tpl/personal.html",
                controller: "personalCtrl"
            })
            .when("/Gob", {
                templateUrl: "tpl/Goldenbeans.html",
                controller: "GoldenbeansCtrl"
            })
            .when("/sig", {
                templateUrl: "tpl/Signin.html",
                controller: "SigninCtrl"
            })
            .when("/Lm", {
                templateUrl: "tpl/Limited.html",
                controller: "LimitedCtrl"
            })
            .when("/bra", {
                templateUrl: "tpl/brand.html",
                controller: "brandCtrl"
            })
            .when("/infor", {
                templateUrl: "tpl/information.html",
                controller: "informationCtrl"
            })
            .when("/Cuse", {
                templateUrl: "tpl/CustomerService.html",
                controller: "CustomerServiceCtrl"
            })
            .when("/int", {
                templateUrl: "tpl/introduce.html",
                controller: "introduceCtrl"
            })
            .when("/Com", {
                templateUrl: "tpl/Complaint.html",
                controller: "ComplaintCtrl"
            })
            .when("/coo", {
                templateUrl: "tpl/cooperation.html",
                controller: "cooperationCtrl"
            })
            .when("/free", {
                templateUrl: "tpl/FreeshippingCtrl.html",
                controller: "FreeshippingCtrl"
            })
            .when("/Aw", {
                templateUrl: "tpl/Award.html",
                controller: "AwardCtrl"
            })
        .otherwise({//当访问的路由不是上述配置的路由时，重定向位置
            redirectTo: "/m"//重定向页面路由位置
        })
    }])