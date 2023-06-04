import { HttpStatus, HttpMessage } from '@exceptions'

export const httpMessage: Record<number, string> = {
  [HttpStatus.CONTINUE]: HttpMessage.CONTINUE,
  [HttpStatus.SWITCHING_PROTOCOLS]: HttpMessage.SWITCHING_PROTOCOLS,
  [HttpStatus.PROCESSING]: HttpMessage.PROCESSING,
  [HttpStatus.EARLY_HINTS]: HttpMessage.EARLY_HINTS,
  [HttpStatus.OK]: HttpMessage.OK,
  [HttpStatus.CREATED]: HttpMessage.CREATED,
  [HttpStatus.ACCEPTED]: HttpMessage.ACCEPTED,
  [HttpStatus.NON_AUTHORITATIVE_INFORMATION]: HttpMessage.NON_AUTHORITATIVE_INFORMATION,
  [HttpStatus.NO_CONTENT]: HttpMessage.NO_CONTENT,
  [HttpStatus.RESET_CONTENT]: HttpMessage.RESET_CONTENT,
  [HttpStatus.PARTIAL_CONTENT]: HttpMessage.PARTIAL_CONTENT,
  [HttpStatus.MULTI_STATUS]: HttpMessage.MULTI_STATUS,
  [HttpStatus.ALREADY_REPORTED]: HttpMessage.ALREADY_REPORTED,
  [HttpStatus.IM_USED]: HttpMessage.IM_USED,
  [HttpStatus.MULTIPLE_CHOICES]: HttpMessage.MULTIPLE_CHOICES,
  [HttpStatus.MOVED_PERMANENTLY]: HttpMessage.MOVED_PERMANENTLY,
  [HttpStatus.FOUND]: HttpMessage.FOUND,
  [HttpStatus.SEE_OTHER]: HttpMessage.SEE_OTHER,
  [HttpStatus.NOT_MODIFIED]: HttpMessage.NOT_MODIFIED,
  [HttpStatus.TEMPORARY_REDIRECT]: HttpMessage.TEMPORARY_REDIRECT,
  [HttpStatus.PERMANENT_REDIRECT]: HttpMessage.PERMANENT_REDIRECT,
  [HttpStatus.BAD_REQUEST]: HttpMessage.BAD_REQUEST,
  [HttpStatus.UNAUTHORIZED]: HttpMessage.UNAUTHORIZED,
  [HttpStatus.PAYMENT_REQUIRED]: HttpMessage.PAYMENT_REQUIRED,
  [HttpStatus.FORBIDDEN]: HttpMessage.FORBIDDEN,
  [HttpStatus.NOT_FOUND]: HttpMessage.NOT_FOUND,
  [HttpStatus.METHOD_NOT_ALLOWED]: HttpMessage.METHOD_NOT_ALLOWED,
  [HttpStatus.NOT_ACCEPTABLE]: HttpMessage.NOT_ACCEPTABLE,
  [HttpStatus.PROXY_AUTHENTICATION_REQUIRED]: HttpMessage.PROXY_AUTHENTICATION_REQUIRED,
  [HttpStatus.REQUEST_TIMEOUT]: HttpMessage.REQUEST_TIMEOUT,
  [HttpStatus.CONFLICT]: HttpMessage.CONFLICT,
  [HttpStatus.GONE]: HttpMessage.GONE,
  [HttpStatus.LENGTH_REQUIRED]: HttpMessage.LENGTH_REQUIRED,
  [HttpStatus.PRECONDITION_FAILED]: HttpMessage.PRECONDITION_FAILED,
  [HttpStatus.PAYLOAD_TOO_LARGE]: HttpMessage.PAYLOAD_TOO_LARGE,
  [HttpStatus.URI_TOO_LONG]: HttpMessage.URI_TOO_LONG,
  [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: HttpMessage.UNSUPPORTED_MEDIA_TYPE,
  [HttpStatus.RANGE_NOT_SATISFIABLE]: HttpMessage.RANGE_NOT_SATISFIABLE,
  [HttpStatus.EXPECTATION_FAILED]: HttpMessage.EXPECTATION_FAILED,
  [HttpStatus.IM_A_TEAPOT]: HttpMessage.IM_A_TEAPOT,
  [HttpStatus.MISDIRECTED_REQUEST]: HttpMessage.MISDIRECTED_REQUEST,
  [HttpStatus.UNPROCESSABLE_ENTITY]: HttpMessage.UNPROCESSABLE_ENTITY,
  [HttpStatus.LOCKED]: HttpMessage.LOCKED,
  [HttpStatus.FAILED_DEPENDENCY]: HttpMessage.FAILED_DEPENDENCY,
  [HttpStatus.TOO_EARLY]: HttpMessage.TOO_EARLY,
  [HttpStatus.UPGRADE_REQUIRED]: HttpMessage.UPGRADE_REQUIRED,
  [HttpStatus.PRECONDITION_REQUIRED]: HttpMessage.PRECONDITION_REQUIRED,
  [HttpStatus.TOO_MANY_REQUESTS]: HttpMessage.TOO_MANY_REQUESTS,
  [HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE]: HttpMessage.REQUEST_HEADER_FIELDS_TOO_LARGE,
  [HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS]: HttpMessage.UNAVAILABLE_FOR_LEGAL_REASONS,
  [HttpStatus.INTERNAL_SERVER_ERROR]: HttpMessage.INTERNAL_SERVER_ERROR,
  [HttpStatus.NOT_IMPLEMENTED]: HttpMessage.NOT_IMPLEMENTED,
  [HttpStatus.BAD_GATEWAY]: HttpMessage.BAD_GATEWAY,
  [HttpStatus.SERVICE_UNAVAILABLE]: HttpMessage.SERVICE_UNAVAILABLE,
  [HttpStatus.GATEWAY_TIMEOUT]: HttpMessage.GATEWAY_TIMEOUT,
  [HttpStatus.HTTP_VERSION_NOT_SUPPORTED]: HttpMessage.HTTP_VERSION_NOT_SUPPORTED,
  [HttpStatus.VARIANT_ALSO_NEGOTIATES]: HttpMessage.VARIANT_ALSO_NEGOTIATES,
  [HttpStatus.INSUFFICIENT_STORAGE]: HttpMessage.INSUFFICIENT_STORAGE,
  [HttpStatus.LOOP_DETECTED]: HttpMessage.LOOP_DETECTED,
  [HttpStatus.NOT_EXTENDED]: HttpMessage.NOT_EXTENDED,
  [HttpStatus.NETWORK_AUTHENTICATION_REQUIRED]: HttpMessage.NETWORK_AUTHENTICATION_REQUIRED,
}
