"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
} from "lucide-react"

export default function AgriPriceGuard() {
  const [selectedRegion, setSelectedRegion] = useState("전국")

  // 모의 데이터
  const fireRiskData = [
    { region: "강원도", risk: "high", percentage: 85 },
    { region: "경상북도", risk: "medium", percentage: 65 },
    { region: "전라남도", risk: "low", percentage: 25 },
    { region: "충청북도", risk: "medium", percentage: 55 },
  ]

  const cropPriceData = [
    { name: "배추", currentPrice: 2800, predictedPrice: 3200, change: 14.3, icon: Wheat },
    { name: "사과", currentPrice: 4500, predictedPrice: 5100, change: 13.3, icon: Apple },
    { name: "당근", currentPrice: 1200, predictedPrice: 1050, change: -12.5, icon: Carrot },
    { name: "양파", currentPrice: 1800, predictedPrice: 2100, change: 16.7, icon: Wheat },
  ]

  const getRiskColor = (risk: string) => {
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

  const getRiskBadgeVariant = (risk: string) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AgriPrice Guard</h1>
                <p className="text-sm text-gray-500">산불 예측 기반 농산물 시장 분석</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                알림 설정
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                설정
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 긴급 알림 */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">긴급 산불 위험 경보</AlertTitle>
          <AlertDescription className="text-red-700">
            강원도 지역에 높은 산불 위험도가 예측됩니다. 해당 지역 농산물 가격 상승이 예상됩니다.
          </AlertDescription>
        </Alert>

        {/* 메인 탭 네비게이션 */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>대시보드</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center space-x-2">
              <Map className="h-4 w-4" />
              <span>위험도 지도</span>
            </TabsTrigger>
            <TabsTrigger value="prediction" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>예측 분석</span>
            </TabsTrigger>
            <TabsTrigger value="prices" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>가격 영향</span>
            </TabsTrigger>
          </TabsList>

          {/* 대시보드 탭 */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* 주요 지표 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">전국 평균 위험도</CardTitle>
                  <Flame className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">57%</div>
                  <p className="text-xs text-muted-foreground">전일 대비 +12%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">고위험 지역</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">3개 지역</div>
                  <p className="text-xs text-muted-foreground">강원, 경북, 충북</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">가격 상승 예상</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+14.2%</div>
                  <p className="text-xs text-muted-foreground">7일 후 예측</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">모니터링 품목</CardTitle>
                  <Wheat className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24개</div>
                  <p className="text-xs text-muted-foreground">주요 농산물</p>
                </CardContent>
              </Card>
            </div>

            {/* 지역별 위험도와 농산물 가격 예측 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 지역별 산불 위험도 */}
              <Card>
                <CardHeader>
                  <CardTitle>지역별 산불 위험도</CardTitle>
                  <CardDescription>실시간 위험도 모니터링</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {fireRiskData.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{region.region}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                          <div
                            className={`h-2 rounded-full ${getRiskColor(region.risk)}`}
                            style={{ width: `${region.percentage}%` }}
                          ></div>
                        </div>
                        <Badge variant={getRiskBadgeVariant(region.risk)}>{region.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 농산물 가격 예측 */}
              <Card>
                <CardHeader>
                  <CardTitle>농산물 가격 예측</CardTitle>
                  <CardDescription>7일 후 예상 가격 변동</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cropPriceData.map((crop, index) => {
                    const Icon = crop.icon
                    const isIncrease = crop.change > 0
                    return (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="font-medium">{crop.name}</div>
                            <div className="text-sm text-gray-500">현재: {crop.currentPrice.toLocaleString()}원/kg</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{crop.predictedPrice.toLocaleString()}원</div>
                          <div className={`text-sm flex items-center ${isIncrease ? "text-red-600" : "text-blue-600"}`}>
                            {isIncrease ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(crop.change)}%
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 위험도 지도 탭 */}
          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>전국 산불 위험도 지도</CardTitle>
                <CardDescription>실시간 위험도 및 예측 정보</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-green-100 to-red-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">대화형 지도가 여기에 표시됩니다</p>
                    <p className="text-gray-400 text-sm mt-2">지역을 클릭하여 상세 정보를 확인하세요</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 예측 분석 탭 */}
          <TabsContent value="prediction" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>7일 산불 발생 예측</CardTitle>
                  <CardDescription>AI 기반 예측 모델 결과</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">예측 차트</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>기상 조건 분석</CardTitle>
                  <CardDescription>온도, 습도, 풍속 등 주요 지표</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span>평균 온도</span>
                      <span className="font-bold text-blue-600">28.5°C</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span>상대 습도</span>
                      <span className="font-bold text-green-600">45%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span>평균 풍속</span>
                      <span className="font-bold text-orange-600">12 km/h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 가격 영향 탭 */}
          <TabsContent value="prices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>농산물별 가격 영향 분석</CardTitle>
                <CardDescription>산불 위험도에 따른 가격 변동 예측</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center border">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">가격 변동 차트가 여기에 표시됩니다</p>
                    <p className="text-gray-400 text-sm mt-2">품목별 상세 분석 및 예측 그래프</p>
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
