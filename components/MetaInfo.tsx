import config from '#config';
import styles from './MetaInfo.module.sass';

export default function MetaInfo({data}: {data: {[_: string]: any}}) {
  const {metaFields: fields = []} = config;
  return <div className={styles.Root}>{fields.map(({label, prop}) => {
    const val = data[prop];
    return val == null ? null : <div key={prop}>
      <span>{label}</span>
      <span>{val}</span>
    </div>;
  })}</div>;
}
