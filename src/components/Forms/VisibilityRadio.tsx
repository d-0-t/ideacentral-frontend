import { Field } from "formik";
import { booleanTransform } from "../../functions/booleanTransform";

export function VisibilityRadio({
  classOfLabel,
  classOfInput,
  fieldName,
  formValue,
  hideTheTitle,
}: any) {
  return (
    <div className="formfield__stacked__stack">
      {!hideTheTitle && (
        <label
          htmlFor={fieldName}
          className={classOfLabel + " textalign-center"}
        >
          Visibility
        </label>
      )}
      <label>
        <Field
          type="radio"
          id={fieldName}
          name={fieldName}
          value="true"
          checked={booleanTransform(formValue)}
        />
        Public
      </label>
      <label>
        <Field
          type="radio"
          id={fieldName}
          name={fieldName}
          value="false"
          checked={!booleanTransform(formValue)}
        />
        Private
      </label>
    </div>
  );
}

export function BooleanRadio({
  classOfLabel,
  classOfInput,
  fieldName,
  formValue,
  hideTheTitle,
  fieldLabel,
}: any) {
  return (
    <div className="formfield__stacked__stack">
      {!hideTheTitle && fieldLabel && (
        <label
          htmlFor={fieldName}
          className={classOfLabel + " textalign-center"}
        >
          {fieldLabel}
        </label>
      )}
      <label>
        <Field
          type="radio"
          id={fieldName}
          name={fieldName}
          value="true"
          checked={booleanTransform(formValue)}
        />
        true
      </label>
      <label>
        <Field
          type="radio"
          id={fieldName}
          name={fieldName}
          value="false"
          checked={!booleanTransform(formValue)}
        />
        false
      </label>
    </div>
  );
}
