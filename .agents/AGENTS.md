# Agent Rules for PrisonRevival_react

## 1. Browser Subagent Execution Rule
- **브라우저 검증 제한**: `browser_subagent` 도구를 실행하기 전에 반드시 사용자에게 먼저 확인(confirm)을 받거나, 사용자가 직접 실행하라고 명시적으로 지시한 경우에만 실행합니다. 임의로 자동 검증을 위해 브라우저를 실행하지 않습니다.

## 2. Multi-file Translation Update Optimization
- **다국어 파일 일괄 수정 지침**: 6개 국어 다국어 파일(JSON)을 동시에 수정할 때, 개별 파일마다 `replace_file_content` 툴을 여러 번 호출하여 사용자에게 개별 승인 피로감을 주지 않습니다. 
- **해결 방안**: 변경할 내용을 하나의 일괄 처리용 임시 스크립트(Node.js 등)로 작성하여 `scratch/`에 저장한 뒤, 사용자의 승인을 받아 `run_command`로 단 한 번에 실행 및 수정을 마치는 방식을 적용합니다.
