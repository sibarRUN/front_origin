const AWS = require('aws-sdk');

// RDS Data API를 초기화
const rds = new AWS.RDSDataService({
  region: 'your-region', // 예: ap-northeast-2
});

// Aurora Serverless에 쿼리를 실행하는 함수
const executeQuery = async (sql, parameters = []) => {
  const params = {
    resourceArn: 'arn:aws:rds:your-region:your-account-id:cluster:your-cluster-name', // Aurora 클러스터 ARN
    secretArn: 'arn:aws:secretsmanager:your-region:your-account-id:secret:your-secret-name', // Secrets Manager ARN
    database: 'your-database-name', // 데이터베이스 이름
    sql, // 실행할 SQL 쿼리
    parameters, // SQL 쿼리의 파라미터
  };

  try {
    const result = await rds.executeStatement(params).promise();
    return result.records; // 결과 반환
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

module.exports = executeQuery;
