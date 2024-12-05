const AWS = require('aws-sdk');

// RDS Data API를 초기화
const rds = new AWS.RDSDataService({
  region: 'ap-northeast-2',
});

// Aurora Serverless에 쿼리를 실행하는 함수
const executeQuery = async (sql, parameters = []) => {
  const params = {
    resourceArn: 'arn:aws:rds:ap-northeast-2:533266969406:cluster:database-1',
    secretArn: 'arn:aws:secretsmanager:ap-northeast-2:533266969406:secret:rds-db-credentials/cluster-DOGKQEPYCVEW3Y4L2VZUS53MVQ/admin/1732195264582-uAau7c',
    database: 'testdb',
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