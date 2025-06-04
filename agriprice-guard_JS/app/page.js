"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  MapPin,
  TrendingUp,
  TrendingDown,
  Flame,
  Wheat,
  Apple,
  Carrot,
  AlertTriangle,
  Bell,
  Settings,
  BarChart3,
  Map,
  Calendar,
  DollarSign,
  User,
  Home,
  Activity,
  Cloud,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Target,
  Database,
  Zap,
  Shield,
  Users,
  ScalingIcon as Growth,
  Clock,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react"

export default function AgriPriceGuardComplete() {
  const [selectedRegion, setSelectedRegion] = useState("전국")
  const [currentUser, setCurrentUser] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // 모의 사용자 데이터
  const mockUser = {
    id: 1,
    username: "농민김씨",
    email: "farmer@example.com",
    userType: "farmer",
    region: "강원도",
    joinDate: "2024-01-15",
  }

  // 확장된 지역 데이터
  const regionsData = [
    {
      id: 1,
      name: "강원도",
      province: "강원도",
      risk: "high",
      percentage: 85,
      latitude: 37.8228,
      longitude: 128.1555,
      forestArea: 1234.5,
      mainCrops: ["감자", "배추", "옥수수"],
    },
    {
      id: 2,
      name: "경상북도",
      province: "경상북도",
      risk: "medium",
      percentage: 65,
      latitude: 36.4919,
      longitude: 128.8889,
      forestArea: 987.3,
      mainCrops: ["사과", "배", "포도"],
    },
    {
      id: 3,
      name: "전라남도",
      province: "전라남도",
      risk: "low",
      percentage: 25,
      latitude: 34.8679,
      longitude: 126.991,
      forestArea: 654.2,
      mainCrops: ["쌀", "양파", "마늘"],
    },
    {
      id: 4,
      name: "충청북도",
      province: "충청북도",
      risk: "medium",
      percentage: 55,
      latitude: 36.8,
      longitude: 127.7,
      forestArea: 543.1,
      mainCrops: ["고추", "콩", "참깨"],
    },
    {
      id: 5,
      name: "경기도",
      province: "경기도",
      risk: "low",
      percentage: 35,
      latitude: 37.4138,
      longitude: 127.5183,
      forestArea: 432.8,
      mainCrops: ["배추", "무", "상추"],
    },
    {
      id: 6,
      name: "전라북도",
      province: "전라북도",
      risk: "medium",
      percentage: 45,
      latitude: 35.7175,
      longitude: 127.153,
      forestArea: 765.4,
      mainCrops: ["쌀", "콩", "고구마"],
    },
  ]

  // 확장된 농산물 가격 데이터
  const cropPricesData = [
    {
      name: "배추",
      currentPrice: 2800,
      predictedPrice: 3200,
      change: 14.3,
      icon: Wheat,
      supply: 1250,
      marketType: "wholesale",
      region: "강원도",
    },
    {
      name: "사과",
      currentPrice: 4500,
      predictedPrice: 5100,
      change: 13.3,
      icon: Apple,
      supply: 890,
      marketType: "retail",
      region: "경상북도",
    },
    {
      name: "당근",
      currentPrice: 1200,
      predictedPrice: 1050,
      change: -12.5,
      icon: Carrot,
      supply: 2100,
      marketType: "wholesale",
      region: "전라남도",
    },
    {
      name: "양파",
      currentPrice: 1800,
      predictedPrice: 2100,
      change: 16.7,
      icon: Wheat,
      supply: 1650,
      marketType: "retail",
      region: "전라남도",
    },
    {
      name: "감자",
      currentPrice: 2200,
      predictedPrice: 2650,
      change: 20.5,
      icon: Wheat,
      supply: 980,
      marketType: "wholesale",
      region: "강원도",
    },
    {
      name: "고추",
      currentPrice: 8900,
      predictedPrice: 10200,
      change: 14.6,
      icon: Wheat,
      supply: 340,
      marketType: "retail",
      region: "충청북도",
    },
  ]

  // 기상 데이터
  const weatherData = [
    { label: "평균 온도", value: "28.5°C", color: "red", icon: Thermometer },
    { label: "상대 습도", value: "45%", color: "blue", icon: Droplets },
    { label: "평균 풍속", value: "12 km/h", color: "green", icon: Wind },
    { label: "강수량", value: "2.3mm", color: "blue", icon: Cloud },
    { label: "가시거리", value: "15km", color: "gray", icon: Eye },
    { label: "기압", value: "1013hPa", color: "purple", icon: Activity },
  ]

  // 예측 모델 성능 데이터
  const modelPerformance = {
    accuracy: 87.3,
    confidence: 92.1,
    trainingData: 15847,
    lastUpdate: "2024-06-04 14:30",
    version: "v2.1.3",
  }

  // 산불 발생 이력 데이터
  const wildfireHistory = [
    {
      id: 1,
      region: "강원도",
      date: "2024-05-15",
      area: 45.2,
      cause: "건조",
      damageLevel: "high",
      affectedCrops: ["감자", "배추"],
    },
    {
      id: 2,
      region: "경상북도",
      date: "2024-04-22",
      area: 23.1,
      cause: "낙뢰",
      damageLevel: "medium",
      affectedCrops: ["사과"],
    },
    {
      id: 3,
      region: "충청북도",
      date: "2024-03-18",
      area: 12.8,
      cause: "실화",
      damageLevel: "low",
      affectedCrops: ["고추"],
    },
  ]

  // 사용자 알림 설정
  const [alertSettings, setAlertSettings] = useState({
    fireRisk: true,
    priceChange: true,
    supplyShortage: false,
    threshold: 70,
  })

  useEffect(() => {
    // 모의 사용자 로그인
    setCurrentUser(mockUser)

    // 모의 알림 데이터
    setNotifications([
      { id: 1, type: "fire_risk", message: "강원도 산불 위험도 85% 도달", time: "2시간 전", read: false },
      { id: 2, type: "price_change", message: "배추 가격 14% 상승 예상", time: "4시간 전", read: false },
      { id: 3, type: "supply_shortage", message: "감자 공급량 부족 경고", time: "1일 전", read: true },
    ])
  }, [])

  // 위험도에 따른 색상 반환 함수
  function getRiskColor(risk) {
    switch (risk) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  // 위험도에 따른 배지 스타일 반환 함수
  function getRiskBadgeVariant(risk) {
    switch (risk) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "outline"
    }
  }

  // 기상 데이터 색상 반환 함수
  function getWeatherColor(color) {
    const colors = {
      red: { bg: "bg-red-50", text: "text-red-600" },
      blue: { bg: "bg-blue-50", text: "text-blue-600" },
      green: { bg: "bg-green-50", text: "text-green-600" },
      gray: { bg: "bg-gray-50", text: "text-gray-600" },
      purple: { bg: "bg-purple-50", text: "text-purple-600" },
    }
    return colors[color] || colors.gray
  }

  // 알림 설정 변경 함수
  function handleAlertSettingChange(setting, value) {
    setAlertSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  // 알림 읽음 처리 함수
  function markNotificationAsRead(notificationId) {
    setNotifications((prev) =>
      prev.map((notification) => {
        if (notification.id === notificationId) {
          return { ...notification, read: true }
        }
        return notification
      }),
    )
  }

  // 모든 알림 읽음 처리 함수
  function markAllNotificationsAsRead() {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  // 지역 선택 함수
  function handleRegionSelect(regionName) {
    setSelectedRegion(regionName)
  }

  // 선택된 지역 정보 가져오기 함수
  function getSelectedRegionData() {
    return regionsData.find((region) => region.name === selectedRegion)
  }

  // 가격 상승 품목 필터링 함수
  function getIncreasedPriceCrops() {
    return cropPricesData.filter((crop) => crop.change > 0).sort((a, b) => b.change - a.change)
  }

  // 가격 하락 품목 필터링 함수
  function getDecreasedPriceCrops() {
    return cropPricesData.filter((crop) => crop.change < 0).sort((a, b) => a.change - b.change)
  }

  // 읽지 않은 알림 개수 계산 함수
  function getUnreadNotificationCount() {
    return notifications.filter((notification) => !notification.read).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-xl shadow-lg">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  AgriPrice Guard
                </h1>
                <p className="text-sm text-gray-500">산불 예측 기반 농산물 시장 분석 플랫폼</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="h-4 w-4 mr-2" />
                  알림
                  {getUnreadNotificationCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500">
                      {getUnreadNotificationCount()}
                    </Badge>
                  )}
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                {currentUser && currentUser.username ? currentUser.username : "로그인"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 긴급 알림 */}
        <Alert className="mb-6 border-red-200 bg-gradient-to-r from-red-50 to-orange-50 shadow-lg">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-800 font-bold">🚨 긴급 산불 위험 경보</AlertTitle>
          <AlertDescription className="text-red-700">
            <strong>강원도</strong> 지역에 <strong>85%</strong> 높은 산불 위험도가 예측됩니다. 해당 지역 농산물 가격{" "}
            <strong>평균 15% 상승</strong>이 예상됩니다.
          </AlertDescription>
        </Alert>

        {/* 메인 탭 네비게이션 */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg rounded-xl p-1">
            <TabsTrigger
              value="dashboard"
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              <Home className="h-4 w-4" />
              <span>대시보드</span>
            </TabsTrigger>
            <TabsTrigger
              value="map"
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              <Map className="h-4 w-4" />
              <span>위험도 지도</span>
            </TabsTrigger>
            <TabsTrigger
              value="prediction"
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              <Target className="h-4 w-4" />
              <span>예측 분석</span>
            </TabsTrigger>
            <TabsTrigger
              value="prices"
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              <DollarSign className="h-4 w-4" />
              <span>가격 영향</span>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4" />
              <span>설정</span>
            </TabsTrigger>
          </TabsList>

          {/* 대시보드 탭 */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* 주요 지표 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-800">전국 평균 위험도</CardTitle>
                  <Flame className="h-5 w-5 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">57%</div>
                  <p className="text-xs text-orange-700 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    전일 대비 +12%
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-800">고위험 지역</CardTitle>
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">3개 지역</div>
                  <p className="text-xs text-red-700">강원, 경북, 충북</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-800">가격 상승 예상</CardTitle>
                  <Growth className="h-5 w-5 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">+14.2%</div>
                  <p className="text-xs text-green-700">7일 후 예측</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-amber-800">모니터링 품목</CardTitle>
                  <Wheat className="h-5 w-5 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">24개</div>
                  <p className="text-xs text-amber-700">주요 농산물</p>
                </CardContent>
              </Card>
            </div>

            {/* 지역별 위험도와 농산물 가격 예측 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 지역별 산불 위험도 */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>지역별 산불 위험도</span>
                  </CardTitle>
                  <CardDescription>실시간 위험도 모니터링 및 상세 정보</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {regionsData.map((region, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border-2 hover:border-blue-300 transition-colors bg-gradient-to-r from-gray-50 to-blue-50"
                    >
                      <div className="flex items-center space-x-4">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <div>
                          <span className="font-semibold text-gray-800">{region.name}</span>
                          <p className="text-xs text-gray-500">산림면적: {region.forestArea}km²</p>
                          <p className="text-xs text-gray-500">주요작물: {region.mainCrops.join(", ")}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-3 w-32">
                          <div
                            className={`h-3 rounded-full ${getRiskColor(region.risk)} shadow-sm`}
                            style={{ width: `${region.percentage}%` }}
                          ></div>
                        </div>
                        <Badge variant={getRiskBadgeVariant(region.risk)} className="font-bold">
                          {region.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 농산물 가격 예측 */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    <span>농산물 가격 예측</span>
                  </CardTitle>
                  <CardDescription>7일 후 예상 가격 변동 및 공급량 정보</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cropPricesData.map((crop, index) => {
                    const Icon = crop.icon
                    const isIncrease = crop.change > 0
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg border-2 hover:border-green-300 transition-colors bg-gradient-to-r from-gray-50 to-green-50"
                      >
                        <div className="flex items-center space-x-4">
                          <Icon className="h-6 w-6 text-green-600" />
                          <div>
                            <div className="font-semibold text-gray-800">{crop.name}</div>
                            <div className="text-sm text-gray-600">현재: {crop.currentPrice.toLocaleString()}원/kg</div>
                            <div className="text-xs text-gray-500">
                              공급량: {crop.supply}톤 ({crop.marketType})
                            </div>
                            <div className="text-xs text-gray-500">주산지: {crop.region}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{crop.predictedPrice.toLocaleString()}원</div>
                          <div
                            className={`text-sm flex items-center justify-end ${isIncrease ? "text-red-600" : "text-blue-600"}`}
                          >
                            {isIncrease ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            <span className="font-bold">{Math.abs(crop.change)}%</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            {/* 최근 뉴스 및 알림 */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-purple-600" />
                  <span>최근 알림 및 뉴스</span>
                </CardTitle>
                <CardDescription>농업 관련 주요 소식 및 시스템 알림</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-400 shadow-sm">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-yellow-800">강원도 산불 주의보 발령</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      건조한 날씨와 강풍으로 인한 산불 위험도 급증, 농가 각별 주의 필요
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-yellow-600">2시간 전 • 기상청</p>
                      <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                        긴급
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-400 shadow-sm">
                  <TrendingUp className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-blue-800">배추 가격 상승 예측</p>
                    <p className="text-sm text-blue-700 mt-1">
                      산불 위험 지역 인근 농가 출하량 감소로 향후 2주간 가격 상승 전망
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-blue-600">4시간 전 • 농업관측센터</p>
                      <Badge variant="outline" className="text-blue-700 border-blue-300">
                        시장분석
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-400 shadow-sm">
                  <Shield className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-green-800">농업기술센터 지원 프로그램</p>
                    <p className="text-sm text-green-700 mt-1">
                      산불 피해 예방을 위한 농가 지원 프로그램 및 보험 가입 안내
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-green-600">1일 전 • 농촌진흥청</p>
                      <Badge variant="outline" className="text-green-700 border-green-300">
                        지원정책
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 위험도 지도 탭 */}
          <TabsContent value="map" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Map className="h-5 w-5 text-blue-600" />
                      <span>전국 산불 위험도 지도</span>
                    </CardTitle>
                    <CardDescription>실시간 위험도 및 예측 정보 (인터랙티브 지도)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 bg-gradient-to-br from-green-100 via-yellow-100 to-red-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-200/30 via-yellow-200/30 to-red-200/30"></div>
                      <div className="text-center z-10">
                        <Map className="h-20 w-20 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 text-xl font-semibold">대화형 한국 지도</p>
                        <p className="text-gray-500 text-sm mt-2">지역을 클릭하여 상세 정보를 확인하세요</p>
                        <p className="text-gray-400 text-xs mt-1">Leaflet.js 기반 실시간 데이터 연동</p>
                      </div>

                      {/* 모의 지역 마커들 */}
                      <div className="absolute top-20 left-32 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                      <div className="absolute top-40 right-28 w-3 h-3 bg-yellow-500 rounded-full animate-pulse shadow-lg"></div>
                      <div className="absolute bottom-32 left-20 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                      <div className="absolute bottom-20 right-40 w-3 h-3 bg-yellow-500 rounded-full animate-pulse shadow-lg"></div>
                    </div>

                    {/* 지도 범례 */}
                    <div className="mt-6 flex justify-center space-x-8">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                        <span className="text-sm font-medium">낮음 (0-30%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-sm"></div>
                        <span className="text-sm font-medium">보통 (31-60%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
                        <span className="text-sm font-medium">높음 (61-100%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* 지역 선택 */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">지역 선택</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {regionsData.map((region) => (
                        <Button
                          key={region.id}
                          variant={selectedRegion === region.name ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => {
                            handleRegionSelect(region.name)
                          }}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          {region.name}
                          <Badge className="ml-auto" variant={getRiskBadgeVariant(region.risk)}>
                            {region.percentage}%
                          </Badge>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 선택된 지역 상세 정보 */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">{selectedRegion} 상세 정보</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedRegion !== "전국" &&
                      (() => {
                        const region = getSelectedRegionData()
                        if (!region) return null
                        return (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">위험도</p>
                                <p className="font-bold text-lg">{region.percentage}%</p>
                              </div>
                              <div>
                                <p className="text-gray-500">산림면적</p>
                                <p className="font-bold">{region.forestArea}km²</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-500 text-sm">주요 농작물</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {region.mainCrops.map((crop, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {crop}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">위도</p>
                                <p className="font-mono">{region.latitude}°</p>
                              </div>
                              <div>
                                <p className="text-gray-500">경도</p>
                                <p className="font-mono">{region.longitude}°</p>
                              </div>
                            </div>
                          </div>
                        )
                      })()}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 예측 분석 탭 */}
          <TabsContent value="prediction" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span>7일 산불 발생 예측</span>
                  </CardTitle>
                  <CardDescription>AI 기반 예측 모델 결과 및 일별 위험도</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-200 relative">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                      <p className="text-blue-600 text-lg font-semibold">예측 차트</p>
                      <p className="text-sm text-blue-500 mt-2">일별 위험도 변화 추이</p>
                      <p className="text-xs text-blue-400 mt-1">Chart.js / Recharts 연동</p>
                    </div>

                    {/* 모의 차트 데이터 포인트 */}
                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                      {[45, 52, 68, 75, 85, 78, 62].map((value, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div
                            className="w-3 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                            style={{ height: `${value * 0.8}px` }}
                          ></div>
                          <span className="text-xs text-blue-600 mt-1">{idx + 1}일</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 예측 요약 */}
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">85%</div>
                      <p className="text-xs text-blue-700">최고 위험도</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">3일차</div>
                      <p className="text-xs text-green-700">위험 피크</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">62%</div>
                      <p className="text-xs text-purple-700">7일 후</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cloud className="h-5 w-5 text-green-600" />
                    <span>기상 조건 분석</span>
                  </CardTitle>
                  <CardDescription>온도, 습도, 풍속 등 주요 기상 지표</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weatherData.map((item, index) => {
                      const Icon = item.icon
                      const colors = getWeatherColor(item.color)
                      return (
                        <div
                          key={index}
                          className={`flex justify-between items-center p-4 ${colors.bg} rounded-lg border shadow-sm hover:shadow-md transition-shadow`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className={`h-5 w-5 ${colors.text}`} />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <span className={`font-bold text-lg ${colors.text}`}>{item.value}</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI 모델 성능 지표 */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  <span>AI 모델 성능 및 시스템 상태</span>
                </CardTitle>
                <CardDescription>예측 정확도, 신뢰도 지표 및 모델 정보</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border shadow-sm">
                    <div className="text-3xl font-bold text-blue-600">{modelPerformance.accuracy}%</div>
                    <p className="text-sm text-blue-700 font-medium">예측 정확도</p>
                    <p className="text-xs text-blue-600 mt-1">지난 30일 평균</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border shadow-sm">
                    <div className="text-3xl font-bold text-green-600">{modelPerformance.confidence}%</div>
                    <p className="text-sm text-green-700 font-medium">모델 신뢰도</p>
                    <p className="text-xs text-green-600 mt-1">검증 데이터 기준</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border shadow-sm">
                    <div className="text-3xl font-bold text-purple-600">
                      {modelPerformance.trainingData.toLocaleString()}
                    </div>
                    <p className="text-sm text-purple-700 font-medium">학습 데이터</p>
                    <p className="text-xs text-purple-600 mt-1">건수</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border shadow-sm">
                    <div className="text-2xl font-bold text-orange-600">{modelPerformance.version}</div>
                    <p className="text-sm text-orange-700 font-medium">모델 버전</p>
                    <p className="text-xs text-orange-600 mt-1">최신 업데이트</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border shadow-sm">
                    <div className="text-lg font-bold text-gray-600">
                      <Clock className="h-6 w-6 mx-auto mb-1" />
                    </div>
                    <p className="text-sm text-gray-700 font-medium">마지막 업데이트</p>
                    <p className="text-xs text-gray-600 mt-1">{modelPerformance.lastUpdate}</p>
                  </div>
                </div>

                {/* 산불 발생 이력 */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Database className="h-5 w-5 mr-2 text-gray-600" />
                    최근 산불 발생 이력
                  </h4>
                  <div className="space-y-3">
                    {wildfireHistory.map((fire) => (
                      <div key={fire.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center space-x-4">
                          <Flame
                            className={`h-5 w-5 ${fire.damageLevel === "high" ? "text-red-500" : fire.damageLevel === "medium" ? "text-yellow-500" : "text-green-500"}`}
                          />
                          <div>
                            <p className="font-medium">
                              {fire.region} • {fire.date}
                            </p>
                            <p className="text-sm text-gray-600">
                              피해면적: {fire.area}km² • 원인: {fire.cause}
                            </p>
                            <p className="text-xs text-gray-500">영향작물: {fire.affectedCrops.join(", ")}</p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            fire.damageLevel === "high"
                              ? "destructive"
                              : fire.damageLevel === "medium"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {fire.damageLevel === "high" ? "심각" : fire.damageLevel === "medium" ? "보통" : "경미"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 가격 영향 탭 */}
          <TabsContent value="prices" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <span>농산물별 가격 영향 분석</span>
                </CardTitle>
                <CardDescription>산불 위험도에 따른 가격 변동 예측 및 시장 분석</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-green-200 relative">
                  <div className="text-center">
                    <TrendingUp className="h-20 w-20 text-green-400 mx-auto mb-4" />
                    <p className="text-green-600 text-xl font-semibold">가격 변동 차트</p>
                    <p className="text-green-500 text-sm mt-2">품목별 상세 분석 및 예측 그래프</p>
                    <p className="text-green-400 text-xs mt-1">실시간 시장 데이터 연동</p>
                  </div>

                  {/* 모의 가격 트렌드 라인 */}
                  <div className="absolute inset-4">
                    <svg className="w-full h-full opacity-30">
                      <polyline
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        points="20,200 80,180 140,160 200,140 260,120 320,100 380,90"
                      />
                      <polyline
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="3"
                        points="20,180 80,170 140,150 200,130 260,110 320,85 380,70"
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 가격 변동 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-red-700">
                    <TrendingUp className="h-5 w-5" />
                    <span>가격 상승 예상 품목</span>
                  </CardTitle>
                  <CardDescription>산불 위험으로 인한 공급 부족 예상 품목</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getIncreasedPriceCrops().map((crop, index) => {
                    const Icon = crop.icon
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-2 border-red-100 hover:border-red-200 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <Icon className="h-6 w-6 text-red-600" />
                          <div>
                            <span className="font-semibold text-gray-800">{crop.name}</span>
                            <p className="text-sm text-gray-600">
                              {crop.currentPrice.toLocaleString()}원 → {crop.predictedPrice.toLocaleString()}원
                            </p>
                            <p className="text-xs text-gray-500">
                              공급량: {crop.supply}톤 • {crop.region}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-red-600 font-bold text-xl">+{crop.change}%</div>
                          <Badge variant="destructive" className="mt-1">
                            상승
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-700">
                    <TrendingDown className="h-5 w-5" />
                    <span>가격 하락 예상 품목</span>
                  </CardTitle>
                  <CardDescription>수요 감소 또는 대체재 증가로 인한 하락 예상</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getDecreasedPriceCrops().map((crop, index) => {
                    const Icon = crop.icon
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-100 hover:border-blue-200 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <Icon className="h-6 w-6 text-blue-600" />
                          <div>
                            <span className="font-semibold text-gray-800">{crop.name}</span>
                            <p className="text-sm text-gray-600">
                              {crop.currentPrice.toLocaleString()}원 → {crop.predictedPrice.toLocaleString()}원
                            </p>
                            <p className="text-xs text-gray-500">
                              공급량: {crop.supply}톤 • {crop.region}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-blue-600 font-bold text-xl">{crop.change}%</div>
                          <Badge variant="secondary" className="mt-1">
                            하락
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            {/* 시장 분석 요약 */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  <span>시장 분석 요약</span>
                </CardTitle>
                <CardDescription>전체 농산물 시장 동향 및 예측 요약</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg border">
                    <TrendingUp className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-600">67%</div>
                    <p className="text-sm text-red-700">상승 품목 비율</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border">
                    <TrendingDown className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">17%</div>
                    <p className="text-sm text-blue-700">하락 품목 비율</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border">
                    <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">+15.2%</div>
                    <p className="text-sm text-green-700">평균 가격 변동</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border">
                    <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">1,247</div>
                    <p className="text-sm text-purple-700">영향받는 농가</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-400">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">시장 전망 요약</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        산불 위험도 증가로 인해 <strong>강원도, 경상북도</strong> 지역 농산물의 공급 부족이 예상됩니다.
                        특히 <strong>감자, 배추, 사과</strong> 등의 가격 상승이 두드러질 것으로 분석됩니다. 농가는 사전
                        대비책 마련이 필요하며, 소비자는 가격 변동에 대한 준비가 권장됩니다.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 프로필/설정 탭 */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 사용자 프로필 */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <span>사용자 프로필</span>
                  </CardTitle>
                  <CardDescription>계정 정보 및 설정 관리</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{currentUser && currentUser.username}</h3>
                      <p className="text-sm text-gray-600">{currentUser && currentUser.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary">
                          {currentUser && currentUser.userType === "farmer" ? "농민" : "소비자"}
                        </Badge>
                        <Badge variant="outline">{currentUser && currentUser.region}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="username">사용자명</Label>
                      <Input id="username" defaultValue={currentUser && currentUser.username} />
                    </div>
                    <div>
                      <Label htmlFor="email">이메일</Label>
                      <Input id="email" type="email" defaultValue={currentUser && currentUser.email} />
                    </div>
                    <div>
                      <Label htmlFor="region">지역</Label>
                      <Input id="region" defaultValue={currentUser && currentUser.region} />
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    프로필 업데이트
                  </Button>
                </CardContent>
              </Card>

              {/* 알림 설정 */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-green-600" />
                    <span>알림 설정</span>
                  </CardTitle>
                  <CardDescription>맞춤형 알림 및 경고 설정</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <Flame className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="font-medium">산불 위험 알림</p>
                          <p className="text-sm text-gray-600">위험도 임계값 도달 시 알림</p>
                        </div>
                      </div>
                      <Switch
                        checked={alertSettings.fireRisk}
                        onCheckedChange={(checked) => {
                          handleAlertSettingChange("fireRisk", checked)
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">가격 변동 알림</p>
                          <p className="text-sm text-gray-600">농산물 가격 급변 시 알림</p>
                        </div>
                      </div>
                      <Switch
                        checked={alertSettings.priceChange}
                        onCheckedChange={(checked) => {
                          handleAlertSettingChange("priceChange", checked)
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium">공급 부족 경고</p>
                          <p className="text-sm text-gray-600">농산물 공급량 부족 예상 시 알림</p>
                        </div>
                      </div>
                      <Switch
                        checked={alertSettings.supplyShortage}
                        onCheckedChange={(checked) => {
                          handleAlertSettingChange("supplyShortage", checked)
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="threshold">위험도 임계값 (%)</Label>
                    <Input
                      id="threshold"
                      type="number"
                      min="0"
                      max="100"
                      value={alertSettings.threshold}
                      onChange={(e) => {
                        handleAlertSettingChange("threshold", Number.parseInt(e.target.value))
                      }}
                    />
                    <p className="text-sm text-gray-500">
                      설정한 위험도 이상일 때 알림을 받습니다 (현재: {alertSettings.threshold}%)
                    </p>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                    알림 설정 저장
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* 알림 이력 */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span>알림 이력</span>
                </CardTitle>
                <CardDescription>최근 받은 알림 및 경고 메시지</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                        notification.read ? "bg-gray-50 border-gray-200" : "bg-blue-50 border-blue-200 shadow-sm"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${
                            notification.type === "fire_risk"
                              ? "bg-red-100"
                              : notification.type === "price_change"
                                ? "bg-green-100"
                                : "bg-yellow-100"
                          }`}
                        >
                          {notification.type === "fire_risk" && <Flame className="h-4 w-4 text-red-600" />}
                          {notification.type === "price_change" && <TrendingUp className="h-4 w-4 text-green-600" />}
                          {notification.type === "supply_shortage" && (
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          )}
                        </div>
                        <div>
                          <p className={`font-medium ${notification.read ? "text-gray-700" : "text-gray-900"}`}>
                            {notification.message}
                          </p>
                          <p className="text-sm text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <Badge variant="default" className="bg-blue-500">
                            새로운
                          </Badge>
                        )}
                        {notification.read ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <Button variant="outline" className="w-full" onClick={markAllNotificationsAsRead}>
                    모든 알림 읽음 처리
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 시스템 정보 */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-gray-600" />
                  <span>시스템 정보</span>
                </CardTitle>
                <CardDescription>플랫폼 버전 및 기술 정보</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">플랫폼 버전</span>
                      <Badge variant="outline">v1.2.0</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">데이터베이스</span>
                      <Badge variant="outline">MySQL 8.0</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">AI 모델</span>
                      <Badge variant="outline">{modelPerformance.version}</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">마지막 업데이트</span>
                      <span className="text-sm text-gray-600">{modelPerformance.lastUpdate}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">가입일</span>
                      <span className="text-sm text-gray-600">{currentUser && currentUser.joinDate}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">서비스 상태</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-600">정상</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
