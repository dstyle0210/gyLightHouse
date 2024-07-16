module.exports = {
    ci: {
        collect: {
          url: ['https://m.gongyoungshop.kr/main.do?idx=3'], // 실행할 주소
          numberOfRuns: 1, // 실행 횟수
        },
        upload: { // 레포트 생성
          target: 'filesystem',
          outputDir: './report',
          reportFilenamePattern: 'today.%%EXTENSION%%',
        },
  }
}