# sudo-rm--rf

## AI 기반 COVID-19 감염 확산 예측 및 예방 플랫폼 프로젝트 계획서

### 프로젝트 개요

### 프로젝트명
**CovidGuard (COVID-19 Guardian)** - AI 기반 COVID-19 감염 확산 예측 및 예방 플랫폼

### 목표
- 실시간 COVID-19 확산 위험도 예측
- 개인 맞춤형 방역 정보 제공
- 지역사회 COVID-19 초기 대응 지원
- 백신 접종률과 변이 바이러스 추적
- SDG 3 (건강과 웰빙) 달성 기여

## 기술 스택

### 프론트엔드
- **웹**: React.js (TypeScript)
  - UI 라이브러리: Material-UI / Ant Design
  - 상태관리: Redux Toolkit
  - 차트: Chart.js / D3.js
  - 지도: Google Maps API / Mapbox
- **모바일**: Flutter
  - 상태관리: Provider / Riverpod
  - 로컬 저장소: Hive / SharedPreferences
  - 푸시 알림: Firebase Cloud Messaging

### 백엔드
- **API 서버**: Flask (Python)
  - 웹 프레임워크: Flask + Flask-RESTful
  - 데이터베이스 ORM: SQLAlchemy
  - API 문서화: Flask-RESTX (Swagger)
  - 인증: Flask-JWT-Extended
  - 환경 설정: Flask-Config

### 데이터베이스
- **주 데이터베이스**: MySQL
- **캐시**: Redis (선택사항)

### AI/ML
- **허깅페이스 모델**: COVID-19 관련 사전 훈련 모델 활용
- **라이브러리**: scikit-learn, pandas, numpy, transformers
- **예측 모델**: LSTM, Random Forest, XGBoost
- **자연어 처리**: COVID-19 뉴스/소셜미디어 분석용 Transformers
- **시계열 분석**: Prophet, ARIMA

### 인프라
- **로컬 개발**: Docker (선택사항)
- **간단한 배포**: 단일 서버 또는 로컬 실행

## 시스템 아키텍처

### 전체 구조 (간소화)
```
[클라이언트] → [Flask API 서버] → [허깅페이스 모델] → [MySQL]
     ↓              ↓                ↓
[React Web]    [COVID-19 AI 분석]   [감염 데이터]
[Flutter App]   [예측 알고리즘]    [백신 데이터]
```

### 단순 구조
- **웹/앱 클라이언트**: React, Flutter
- **API 서버**: Flask (단일 서버)
- **AI 처리**: 허깅페이스 모델 + COVID-19 전용 ML
- **데이터 저장**: MySQL (감염자 수, 백신 접종률, 사망률 등)

## 주요 기능

### 핵심 기능
1. **실시간 COVID-19 확산 위험도 대시보드**
   - 지역별 확진자 수 및 위험도 맵 시각화
   - 일별/주별 확산 예측 그래프
   - 백신 접종률 현황
   - 중환자실 가용 병상 수

2. **개인 맞춤형 방역 가이드**
   - 위치 기반 COVID-19 위험도 알림
   - 개인 건강 상태 및 백신 접종 여부 고려한 맞춤 조언
   - 마스크 착용, 사회적 거리두기 가이드
   - 자가격리 관리 도구

3. **의료진 및 정부 지원 기능**
   - 선별진료소 및 검사소 위치 정보
   - 백신 접종 센터 안내 및 예약 현황
   - 의료진 전용 상세 분석 데이터
   - 병상 현황 및 의료진 배치 최적화

4. **조기 경보 시스템**
   - 소셜 미디어 COVID-19 관련 키워드 모니터링
   - 증상 관련 이상 징후 자동 감지
   - 집단감염 위험 지역 예측
   - 관련 기관 자동 알림

### AI 모델별 세부 기능

#### COVID-19 확산 예측 AI
- **허깅페이스 모델**: COVID-19 전용 시계열 예측 모델 활용
- **머신러닝**: LSTM + Random Forest 앙상블
- **입력 데이터**: 일별 확진자 수, 백신 접종률, 이동량 데이터
- **출력**: 7-14일 확산 예측 및 신뢰구간

#### 맞춤형 방역 정보 AI
- **허깅페이스**: 의료 텍스트 분류 모델
- **규칙 기반**: 나이, 기저질환, 백신 접종 상태별 추천
- **출력**: 개인별 맞춤 방역 수칙 및 행동 지침

#### COVID-19 이상 징후 감지 AI
- **허깅페이스**: COVID-19 관련 텍스트 분석 모델
- **소셜미디어 분석**: 트위터, 뉴스 키워드 감지
- **증상 패턴 분석**: 발열, 기침 등 증상 클러스터링
- **출력**: 지역별 이상 징후 위험도 점수

## 데이터 관리 (COVID-19 특화)

### 데이터 소스
- **공공 데이터**: 질병관리청 COVID-19 확진자 현황
- **샘플 데이터**: CSV 파일로 준비된 가상 COVID-19 데이터
- **백신 데이터**: 접종률, 백신 종류별 효과 데이터
- **변이 바이러스**: 델타, 오미크론 등 변이 정보

### 데이터 파이프라인
1. **COVID-19 데이터**: 일별 확진자, 사망자, 완치자 수
2. **백신 데이터**: 1차, 2차, 부스터 접종률
3. **전처리**: pandas로 결측치 처리 및 정규화
4. **저장**: MySQL에 시계열 데이터로 저장
5. **모델 입력**: 허깅페이스 및 ML 모델에 실시간 입력

## 개발 일정 (대회용 4-6주)

### Phase 1: 기반 구축 (1주)
- **1-2일**: Flask 프로젝트 환경 설정, 기본 라우팅
- **3-4일**: MySQL DB 설정, COVID-19 데이터 스키마 설계
- **5-7일**: COVID-19 샘플 데이터 준비, Flask API 기본 구조

### Phase 2: 핵심 기능 개발 (2-3주)
- **2주**: 
  - 허깅페이스 COVID-19 모델 연동
  - LSTM 기반 확산 예측 로직
  - React COVID-19 대시보드 (확진자 현황, 백신 접종률)
- **3주**:
  - Flutter 앱 COVID-19 정보 화면
  - 개인 맞춤형 방역 추천 로직
  - COVID-19 데이터 시각화 (감염 곡선, 백신 효과)

### Phase 3: 완성 및 데모 준비 (1-2주)
- **4주**:
  - COVID-19 소셜미디어 모니터링 기능
  - 집단감염 위험 예측
  - UI/UX 개선 (의료진 친화적 인터페이스)
- **5-6주** (선택):
  - COVID-19 변이 바이러스 추적 기능
  - 발표 준비 및 데모 시나리오
  - 최종 테스트

## 팀 구성 및 역할 (대회용)

### 필요 인력 (3-4명)
- **백엔드/풀스택 개발자** (1명): Flask API + React 담당
- **모바일 개발자** (1명): Flutter COVID-19 앱 개발
- **AI/데이터 사이언티스트** (1명): COVID-19 예측 모델, 허깅페이스 연동
- **팀장/의료 도메인 전문가** (1명): COVID-19 도메인 지식, 프로젝트 관리

### 역할 분담
- **백엔드/웹**: Flask API 개발, React COVID-19 대시보드
- **모바일**: Flutter COVID-19 추적 앱, 개인 방역 기능
- **AI**: COVID-19 예측 모델, 허깅페이스 모델 최적화
- **기획**: COVID-19 시나리오 설계, 의료진 요구사항 분석

## 주요 도전 과제 및 해결 방안

### 기술적 도전
- **COVID-19 데이터 품질**: 정확하고 최신의 감염 데이터 확보
- **예측 정확도**: COVID-19 변이와 백신 효과 반영
- **실시간 처리**: 대량의 COVID-19 데이터 실시간 분석

### 해결 방안
- **데이터 검증**: 여러 소스의 COVID-19 데이터 교차 검증
- **앙상블 모델**: 여러 예측 모델 결합으로 정확도 향상
- **캐싱 전략**: Redis를 활용한 실시간 데이터 캐싱

## COVID-19 특화 데모 준비

### 데모 시나리오
- **지역 선택**: 서울 강남구 COVID-19 현황 중심
- **시간대**: 2주간의 COVID-19 확산 예측 시뮬레이션
- **변이 시나리오**: 오미크론 변이 확산 상황 시뮬레이션
- **백신 효과**: 접종률별 감염 억제 효과 분석

### 필요한 기능 (최소 기능 셋)
1. **웹 대시보드**:
   - COVID-19 확진자 현황 지도 (일별 변화)
   - 감염 곡선 및 예측 그래프
   - 백신 접종률 현황
   - 중환자실 병상 가용률

2. **모바일 앱**:
   - 개인 COVID-19 위험도 평가
   - 맞춤형 방역 수칙 (마스크, 거리두기)
   - 주변 검사소/백신센터 정보
   - 자가격리 관리 도구

3. **AI 기능**:
   - 허깅페이스로 COVID-19 뉴스 감정 분석
   - LSTM으로 확진자 수 예측
   - 백신 접종률 기반 집단면역 예측

## Flask 기반 구현 가이드

### Flask 프로젝트 구조
```
covid_guard/
├── app/
│   ├── __init__.py          # Flask 앱 초기화
│   ├── routes/
│   │   ├── covid_api.py     # COVID-19 데이터 API
│   │   ├── prediction.py    # 예측 API
│   │   └── user.py          # 사용자 관리
│   ├── models/
│   │   ├── covid_data.py    # COVID-19 데이터 모델
│   │   └── user.py          # 사용자 모델
│   ├── services/
│   │   ├── ml_service.py    # ML 예측 서비스
│   │   └── huggingface.py   # 허깅페이스 연동
│   └── utils/
├── config.py                # Flask 설정
├── requirements.txt
└── run.py                   # 앱 실행
```

### 핵심 Flask 코드 예시
```python
# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://user:pass@localhost/covid_db'
    
    db.init_app(app)
    
    api = Api(app, doc='/docs/')
    
    from app.routes.covid_api import covid_ns
    api.add_namespace(covid_ns)
    
    return app

# app/routes/covid_api.py
from flask_restx import Namespace, Resource
from app.services.ml_service import predict_covid_spread

covid_ns = Namespace('covid', description='COVID-19 related operations')

@covid_ns.route('/predict/<region>')
class CovidPredict(Resource):
    def get(self, region):
        prediction = predict_covid_spread(region)
        return {'region': region, 'prediction': prediction}
```

## 성공 지표 (대회 평가 기준)

### 기술적 완성도
- **Flask API**: COVID-19 데이터 CRUD 및 예측 API 완성
- **AI 모델**: 허깅페이스 COVID-19 모델 정상 작동
- **예측 정확도**: COVID-19 확산 예측 신뢰도 80% 이상
- **실시간 처리**: COVID-19 데이터 업데이트 및 즉시 반영

### COVID-19 특화 기능
- **의료진 지원**: 실제 의료진이 사용 가능한 인터페이스
- **정책 제안**: 방역 정책 효과 예측 및 제안
- **시민 참여**: 시민들이 쉽게 접근할 수 있는 정보 제공
- **글로벌 호환**: 해외 COVID-19 데이터와 비교 분석

## 구현 팁 및 주의사항

### 허깅페이스 COVID-19 모델 추천
- **의료 텍스트**: `emilyalsentzer/Bio_ClinicalBERT`
- **COVID-19 전용**: `deepset/covid_bert_base`
- **한국어 의료**: `klue/roberta-base` + COVID-19 파인튜닝
- **감정 분석**: `cardiffnlp/twitter-roberta-base-sentiment-latest`

### Flask 개발 우선순위
1. **1순위**: Flask 기본 구조 + COVID-19 데이터 API
2. **2순위**: MySQL COVID-19 스키마 + SQLAlchemy 모델
3. **3순위**: React COVID-19 대시보드
4. **4순위**: 허깅페이스 COVID-19 모델 연동
5. **5순위**: Flutter COVID-19 추적 앱

### COVID-19 데모데이터 예시
```python
# COVID-19 일별 데이터
{
  "date": "2024-12-01",
  "region": "강남구",
  "confirmed_cases": 145,
  "deaths": 2,
  "recovered": 120,
  "vaccination_rate": 0.85,
  "variant": "오미크론",
  "risk_level": "높음"
}

# 개인 COVID-19 프로필
{
  "age": 65,
  "location": "강남구",
  "underlying_condition": ["당뇨", "고혈압"],
  "vaccination_status": "부스터 접종 완료",
  "risk_group": "고위험군"
}
```

## 대회 후 발전 가능성

### 실제 COVID-19 서비스 전환
- **정부 기관 연계**: 질병관리청, 지자체와 실시간 데이터 연동
- **의료진 전용 버전**: 병원 내 COVID-19 환자 관리 시스템
- **국제 협력**: WHO, 해외 방역 기관과 데이터 공유
- **정책 지원**: 정부 방역 정책 수립 지원 도구

### 포스트 COVID-19 확장
- **범용 감염병 플랫폼**: 인플루엔자, 노로바이러스 등 확장
- **만성질환 관리**: 당뇨, 고혈압 등 만성질환 예측 및 관리
- **예방의학 플랫폼**: 질병 예방 중심의 건강 관리 서비스


[workLog](https://github.com/dolphin-kidnappers/sudo-rm--rf/tree/main/workLog)