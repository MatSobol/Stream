package org.auth.util.Converter;

public interface Converter<F, T> {
    T convert(F from);
}