import { FormField, Textarea } from './ui';
import { C, fonts } from './tokens';

function YesNoField({ question, name, value, onChange }) {
  return <FormField label={question}>
    <div role="radiogroup" aria-label={question} style={{ display: 'flex', gap: 24 }}>
      {['Yes', 'No'].map(answer => <label key={answer} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, fontFamily: fonts.body, fontSize: 14, color: C.espresso, cursor: 'pointer' }}>
        <input type="radio" name={name} value={answer} checked={value === answer} onChange={() => onChange(answer)} style={{ accentColor: C.crimson, margin: 0 }} />
        {answer}
      </label>)}
    </div>
  </FormField>;
}

export default function RehearsalProductionFields({ value, onChange }) {
  const update = (key, next) => onChange({ ...value, [key]: next });

  return <details style={{ borderBlock: `1px solid ${C.border}`, padding: '16px 0', fontFamily: fonts.body }}>
    <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: 16 }}>Production support & recording (optional)</summary>
    <div style={{ display: 'grid', gap: 16, marginTop: 16 }}>
      <YesNoField question="Would you like a production engineer on hand to provide technical support for your rehearsal?" name="rehearsal-engineer" value={value.engineer} onChange={answer => update('engineer', answer)} />
      <YesNoField question="Would you like audio or video of your session recorded?" name="rehearsal-recording" value={value.recording} onChange={answer => update('recording', answer)} />
      <FormField label="Have a stage plot? Enter your band lineup and monitor mixes">
        <Textarea id="rehearsal-setup" aria-label="Have a stage plot? Enter your band lineup and monitor mixes" rows={4} value={value.setup} onChange={e => update('setup', e.target.value)} placeholder="For example: drums, bass, two guitars, three vocals. We have an in-ear system and need three separate monitor mix feeds." />
      </FormField>
    </div>
  </details>;
}
